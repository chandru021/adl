import { Grid, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { Component } from "react";
import DisLike from "./Dislike";
import Like from "./Like";
import "./review.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "./Dialogue";
import axios from "axios";

class Review extends Component {
	state = {
		review: "",
		reviews: [],
		batch: 2020,
		intervalObject: null,
		userReactions: [],
		user_id: null,
	};

	intervalFunc = async (courseCode, sem, year, batch) => {
		console.log(batch);
		const reviews = await axios.get(
			`http://localhost:3001/feedbacks/${courseCode}/${batch}`
		);

		const { userReactions } = this.state;
		let data = [...userReactions];
		if (data.length != 0) {
			for (let i = 0; i < data.length; i++) {
				for (let j = 0; j < reviews.data.length; j++) {
					if (data[i].review_id === reviews.data[j]._id) {
						reviews.data[j].liked = data[i].liked;
						reviews.data[j].disLiked = data[i].disLiked;
					}
				}
			}
		}
		let sortedReviews = this.sort(reviews.data);

		this.setState({
			reviews: sortedReviews,
		});
		return Promise.resolve("ok");
	};

	componentDidUpdate = async (prevProps, prevState) => {
		const { courseCode, sem, year } = this.props.routerParams;
		if (
			prevProps.routerParams.courseCode != courseCode ||
			prevState.batch != this.state.batch
		) {
			if (prevState.intervalObject != null) {
				clearInterval(prevState.intervalObject);
			}
			const reviews = await axios.get(
				`http://localhost:3001/feedbacks/${courseCode}/${this.state.batch}`
			);

			let intervalObject = setInterval(() => {
				const batch = this.state.batch;
				this.intervalFunc(courseCode, sem, year, batch).then(() => {});
			}, 10000);

			const { userReactions } = this.state;
			let data = [...userReactions];
			if (data.length != 0) {
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < reviews.data.length; j++) {
						if (data[i].review_id === reviews.data[j]._id) {
							reviews.data[j].liked = data[i].liked;
							reviews.data[j].disLiked = data[i].disLiked;
						}
					}
				}
			}

			let sortedReviews = this.sort(reviews.data);

			this.setState({
				reviews: sortedReviews,
				intervalObject,
			});
		}
	};

	componentDidMount = async () => {
		console.log(this.props.routerParams.reg_year);
		const { courseCode, sem, year } = this.props.routerParams;
		const reviews = await axios.get(
			`http://localhost:3001/feedbacks/${courseCode}/${this.state.batch}`
		);

		let intervalObject = setInterval(() => {
			this.intervalFunc(courseCode, sem, 1, this.state.batch).then(
				() => {}
			);
		}, 10000);

		let user_id = this.props.routerParams.user_id;

		const userReactions = await axios.get(
			`http://localhost:3001/userReactions/${user_id}`
		);

		let data = userReactions.data;
		let newReviews = [];
		if (data.length != 0) {
			for (let i = 0; i < data.length; i++) {
				for (let j = 0; j < reviews.data.length; j++) {
					if (data[i].review_id === reviews.data[j]._id) {
						reviews.data[j].liked = data[i].liked;
						reviews.data[j].disLiked = data[i].disLiked;
					}
				}
			}
		}
		let sortedReviews = this.sort(reviews.data);
		this.setState({
			reviews: sortedReviews,
			intervalObject,
			user_id,
			userReactions: data,
		});
	};

	handleSubmit = async () => {
		const { courseCode, sem, year } = this.props.routerParams;
		let reviews = [...this.state.reviews];
		let newReview = {
			user_id: this.state.user_id,
			likes: 0,
			review: this.state.review,
			liked: false,
			disLiked: false,
			courseCode,
			sem: parseInt(sem),
			year: parseInt(year),
			checked: false,
			batch: this.state.batch,
		};
		const result = await axios.post(
			"http://localhost:3001/newReview",
			newReview
		);
		newReview["_id"] = result.data._id;
		reviews.push(newReview);
		this.setState({
			reviews: reviews,
		});
	};

	handleChange = ({ currentTarget: input }) => {
		this.setState({
			review: input.value,
		});
	};

	sort = (reviews) => {
		reviews.sort(function (x, y) {
			return y.likes - x.likes;
		});

		return reviews;
	};

	onLike = async (id) => {
		// console.log(this.state.reviews);
		// console.log(id);
		console.log(this.state.user_id);
		let reviews = [...this.state.reviews];
		let r_id = -1;
		for (let i = 0; i < reviews.length; i++) {
			if (reviews[i]._id === id) {
				r_id = i;
				reviews[i].liked = !reviews[i].liked;
				if (reviews[i].liked === true) {
					reviews[i].likes += 1;

					if (reviews[i].disLiked === true) {
						reviews[i].disLiked = false;
						reviews[i].likes += 1;
					}
				} else {
					reviews[i].likes -= 1;
				}
				break;
			}
		}

		let patchedObject = reviews[r_id];
		patchedObject["react_user_id"] = this.state.user_id;
		console.log(patchedObject);

		const result = await axios.put(
			"http://localhost:3001/react",
			patchedObject
		);

		let userReactions = await axios.get(
			`http://localhost:3001/userReactions/${this.state.user_id}`
		);

		reviews = this.sort(reviews);

		this.setState({
			reviews,
			userReactions: userReactions.data,
		});
	};

	onDisLike = async (id) => {
		// console.log(id);
		let reviews = [...this.state.reviews];
		let r_id = -1;
		for (let i = 0; i < reviews.length; i++) {
			if (reviews[i]._id === id) {
				r_id = i;
				reviews[i].disLiked = !reviews[i].disLiked;
				if (reviews[i].disLiked === true) {
					reviews[i].likes -= 1;
					if (reviews[i].liked === true) {
						reviews[i].liked = false;
						reviews[i].likes -= 1;
					}
				} else {
					reviews[i].likes += 1;
				}
				break;
			}
		}

		let patchedObject = reviews[r_id];
		patchedObject["react_user_id"] = this.state.user_id;
		console.log(patchedObject);
		reviews = this.sort(reviews);

		const result = await axios.put(
			"http://localhost:3001/react",
			patchedObject
		);

		let userReactions = await axios.get(
			`http://localhost:3001/userReactions/${this.state.user_id}`
		);

		reviews = this.sort(reviews);
		console.log(userReactions);
		this.setState({
			reviews,
			userReactions: userReactions.data,
		});
	};

	changeBatch = ({ currentTarget: input }) => {
		// console.log(input.value);
		const batch = input.value;
		this.setState({
			batch: batch,
		});
	};
	render() {
		return (
			<div style={{ backgroundColor: "black" }}>
				<Stack direction="row">
					<div
						className="left"
						style={{
							backgroundColor: "white",
							width: "50vw",
							height: "100vh",
							display: "flex",
							flexWrap: "wrap",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "center",
							padding: "70px",
						}}
					>
						<div
							style={{
								backgroundColor: "black",
								width: "100%",
								height: "80vh",
								display: "flex",
								borderRadius: "30px",
								padding: "30px",
								flexWrap: "wrap",
							}}
						>
							<h1 style={{ color: "white" }}>
								Share your Experience !
							</h1>

							<textarea
								onChange={this.handleChange}
								value={this.state.review}
								style={{
									width: "100%",
									maxHeight: "25vh",
									borderRadius: "30px",
									padding: "20px",

									outline: "none",
								}}
							></textarea>
							<Button
								style={{
									width: "50%",
									maxHeight: "50px",
									borderRadius: "20px",
									backgroundColor: "white",
									color: "black",
								}}
								variant="contained"
								onClick={this.handleSubmit}
								disabled={
									this.state.batch ===
									this.props.routerParams.reg_year
										? false
										: true
								}
							>
								Submit
							</Button>
							<select
								name="Batch"
								// id="cars"
								value={this.state.batch}
								onChange={this.changeBatch}
								style={{
									width: "50%",
									height: "50px",
									borderRadius: "20px",
									textAlign: "center",
								}}
							>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
								<option value="2022">2022</option>
							</select>
						</div>
					</div>
					<div
						className="right"
						style={{
							backgroundColor: "black",
							width: "50vw",
							height: "100vh",
							display: "flex",
							flexWrap: "wrap",
							alignContent: "left",
							alignItems: "left",
							justifyContent: "left",
							textAlign: "left",
							padding: "30px",
							overflowY: "scroll",
						}}
					>
						{this.state.reviews.map((k) => (
							<Dialog
								comment={k.review}
								likes={k.likes}
								onLike={this.onLike}
								liked={k.liked}
								id={k._id}
								onDisLike={this.onDisLike}
								disLiked={k.disLiked}
							/>
						))}
					</div>
				</Stack>
			</div>
		);
	}
}

export default Review;
