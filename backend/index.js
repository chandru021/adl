//framework
const express = require("express");

const app = express();

const config = require("config");
const debug = require("debug")("app:dev");
const morgan = require("morgan");
const Filter = require("bad-words");

//access db
const mongoose = require("mongoose");

const cors = require("cors");
const Joi = require("joi");

//logging
app.use(morgan("tiny"));

//to enable cross orign request
app.use(cors());

//to access endpoint parameters
app.use(express.urlencoded());

//to access json objects in request body
app.use(express.json());

//JOI object that will validate json objects
const validReview = Joi.object({
	review: Joi.string().required().max(200),
	likes: Joi.number().required(),
	courseCode: Joi.string().required().max(6).min(6),
	year: Joi.number().required().min(1),
	sem: Joi.number().required().min(1).max(2),
	user_id: Joi.string().required().min(1),
	checked: Joi.boolean().required(),
	disLiked: Joi.boolean().required(),
	liked: Joi.boolean().required(),
	batch: Joi.string().required(),
});

const filter = new Filter();

const names = [
	"Sudha Sadasivam",
	"Jayashree LS",
	"Jayashree",
	"Arul Anand",
	"Lovelyn Rose",
	"Santhi",
	"Kavitha",
	"Gopika Rani",
	"Ramesh",
	"Sathiyapriya",
	"Vijayalakshmi",
	"Saranya",
	"ArulJothi",
	"Prakash",
	"Vani",
	"Adlene Anusha",
	"Sivaranjani",
	"Karpagam",
	"Indumathi",
	"Suriya",
	"Thirumahal",
];

for (const name of names) {
	filter.addWords(name);
	filter.addWords(name.toLowerCase());
	filter.addWords(name.toUpperCase());
}
//schema for a new review
const reviewSchema = mongoose.Schema({
	likes: Number,
	review: String,
	user_id: String,
	liked: Boolean,
	disLiked: Boolean,
	courseCode: String,
	sem: Number,
	year: Number,
	checked: Boolean,
	batch: String,
});

//schema for reaction of a user
const reactionSchema = mongoose.Schema({
	review_id: String,
	user_id: String,
	liked: Boolean,
	disLiked: Boolean,
});

//schema for User Login
const loginSchema = mongoose.Schema({
	user_id: String,
	password: String,
	unique_key: String,
	reg_year: String,
});

//schema for list of subjects
const subjectSchema = mongoose.Schema({
	sem: Number,
	year: Number,
	subjects: [String],
	labels: [String],
});

//connecting to database
mongoose
	.connect(config.get("database"))
	.then(() => {
		debug("connected");
	})
	.catch((err) => {
		debug(err);
	});

//mongoose model classes for each cluster
const course = mongoose.model("feedbacks", reviewSchema);
const reviews = mongoose.model("likes", reactionSchema);
const login = mongoose.model("login", loginSchema);
const subjects = mongoose.model("subjects", subjectSchema);

//function to validate json object format and values
const validate = (obj) => {
	let result = validReview.validate(obj);
	if (result.error) {
		return result.error.message;
	} else {
		return null;
	}
};
// var Filter = require("bad-words");
// let filter = new Filter();

//posting a new review
app.post("/newReview", async (req, res) => {
	//validating the review format using JOI
	console.log(req.body);
	let result = validate(req.body);
	// console.log("sladfja;lsdjf;lj");
	let temp = { ...req.body };
	console.log(filter.clean("Arul Jothi"));
	// console.log(temp);
	// var Filter = require("bad-words"),

	// console.log(filter.clean("Don't be an ash0le"));
	// console.log(temp);
	temp.review = filter.clean(temp.review);
	console.log(temp.review);
	// console.log(temp);
	if (result == null) {
		const newReview = new course(temp);
		const pushed = await newReview.save();
		res.send(pushed);
	}
});

//function to hash a string
const hashIt = (raw) => {
	var hash = 0,
		i,
		chr;
	if (raw.length === 0) return hash;
	for (i = 0; i < raw.length; i++) {
		chr = raw.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return hash;
};

app.post("/login", async (req, res) => {
	//accessing password from req.body
	const hashed = hashIt(req.body.password);

	//verifiying the hashed password and username in the db
	const result = await login
		.find()
		.and([{ user_id: req.body.user_id }, { password: hashed }]);

	if (result.length == 0) res.send("Invalid");
	else {
		console.log(result);
		res.send(result[0].reg_year);
	}
});

app.post("/register", async (req, res) => {
	//checking if user already exists
	console.log(req.body);
	const result = await login.find({ user_id: req.body.user_id });

	//if exists
	if (result.length !== 0) res.send("Already Exsists");
	//else create new user by hashing password
	else {
		// let valid = validLogin.validate(req.body);
		// if (valid.error) {
		// res.send(valid.error.message);
		// } else {
		let newHash = hashIt(req.body.password);
		const loginObject = new login({
			user_id: req.body.user_id,
			password: newHash,
			reg_year: req.body.reg_year,
		});
		try {
			const result2 = await loginObject.save();

			//send back status;
			res.send("ok");
		} catch (err) {
			//send error if error occurs
			res.send(err);
		}
		// }
	}
});

app.get("/subjects/:year/:sem", async (req, res) => {
	//parsing through the request url parameters
	const sem = parseInt(req.params.sem);
	const year = parseInt(req.params.year);

	//accessing db
	const result = await subjects.find().and([{ year: year }, { sem: sem }]);

	//sending back the result
	res.send(result);
});

app.get("/userReactions/:user_id", async (req, res) => {
	//getting userReactions asynchronously from mongodb
	const result = await reviews.find({ user_id: req.params.user_id });

	//sending back the result
	res.send(result);
});

app.put("/react", async (req, res) => {
	//updating the likes of review
	let result = await course.findById(req.body._id);
	result.likes = req.body.likes;
	let result2 = await result.save();

	//finding wether user has previously reacted
	result2 = await reviews
		.find()
		.and([
			{ user_id: req.body.react_user_id },
			{ review_id: req.body._id },
		]);

	if (result2.length === 0) {
		//creaing new entry in reaction document
		const reviewObject = new reviews({
			user_id: req.body.react_user_id,
			review_id: req.body._id,
			liked: req.body.liked,
			disLiked: req.body.disLiked,
		});

		//saving changes
		const result4 = await reviewObject.save();
		res.send(result4);
	} else {
		//updating the existing entry
		result2[0].liked = req.body.liked;
		result2[0].disLiked = req.body.disLiked;
		const result5 = await result2[0].save();
		res.send(result5);
	}
});

app.get("/feedbacks/:courseCode/:batch", async (req, res) => {
	//accessing the request url parameters

	const { courseCode, batch } = req.params;

	//calling mongodb asynchronously with specific courseCode
	const result = await course
		.find()
		.and([{ courseCode: courseCode }, { batch: batch }]);

	//sending back the result
	res.send(result);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});

app.delete("/deleteReview", async (req, res) => {
	const { _id } = req.body;

	//review id has to be either 12 or 24 in length
	if (_id.length !== 12 && _id.length !== 24) {
		res.send("invalid id");
	} else {
		//checking if review exists
		const findResult = await course.findById(_id);
		if (findResult === null) res.send("No such review");
		else {
			//proceding to delete review
			const deleteResult = await course.deleteOne({ _id: _id });
			console.log(deleteResult);
			if (deleteResult === null) {
				res.send("Error");
			} else res.send("deleted");
		}
	}
});
