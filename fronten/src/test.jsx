import React, { Component } from "react";
import Joi from "joi";
import axios from "axios";

class TestForm extends Component {
	state = {
		account: { user_id: "", review: "", sem: 4, course: "212331" },
		error: {},
		fetches: [],
	};

	// const userId = React.useRef();
	userName = React.createRef();

	validate = () => {
		// return { username: "username is required" };
		// let error = {};
		// if (this.state.account.username.trim() === "") {
		// 	error.username = "username is required";
		// }
		// if (this.state.account.password.trim() === "") {
		// 	error.password = "password is required";
		// }

		const { account } = this.state;

		let joi = Joi.object({
			username: Joi.string().required().min(3).max(20).label("Username"),
			password: Joi.string().required().min(10).label("Password"),
		});

		// const result = joi.validate(account, { abortEarly: false });
		let result = {};
		// console.log(result);
		if (!result.error) {
			return null;
		} else {
			let temp = {};
			for (let x of result.error.details) {
				temp[x.path] = x.message;
			}

			// console.log(temp);
			return temp;
		}

		// return error;
		// return Object.keys(error).length === 0 ? null : error;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		let error = this.validate();
		console.log(error);
		if (error) {
			this.setState({
				error: error,
			});
		} else {
			let temp = { ...this.state.account };
			let result = await axios.post(
				"http://localhost:3001/postReview",
				temp
			);
			// console.log(result);
			console.log(result);
			console.log(result.data[0].message);
		}

		// console.log(this.userName.current.value);
	};

	validateProperty = (input) => {
		let temp = {};
		temp.value = input.value;
		const joiObject = Joi.object({
			value: Joi.string().required().min(3).max(10),
		});

		// console.log(joiObject.validate(temp));
		let result = joiObject.validate(temp);

		return result;
		// if (result.error) return result.error.details[0].message;

		// return result.error.details[0].message;
		// if (input.value.length === 0) return null;
		// if (input.value.length < 8)
		// 	return `${input.name} must be greater than 8`;
	};

	handleChange = ({ currentTarget: input }) => {
		let error = { ...this.state.error };
		let errorMessage = this.validateProperty(input);

		if (errorMessage) error[input.name] = errorMessage;
		else delete error[input.name];

		let account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({
			account,
			error,
		});
	};

	fetch = async () => {
		const result = await axios.get(
			"http://localhost:3001/reviews/?course=computer&&year=2"
		);
		console.log(result);
		if (result) {
			let data = [];
			result.data.forEach((x) => {
				data.push(x);
			});

			this.setState({
				fetches: data,
			});
		}
	};

	render() {
		const { user_id, review, sem, course } = this.state.account;
		const { error } = this.state;
		return (
			<React.Fragment>
				<div className="container">
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="userId"></label>
							<input
								// ref={this.userName}
								value={user_id}
								onChange={this.handleChange}
								// autoFocus={true}
								name="user_id"
								placeholder="userid"
								id="userId"
								type="text"
								className="form-control"
							/>
							{error.username && (
								<div className="alert alert-danger">
									{error.username}
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="userId"></label>
							<input
								// ref={this.userName}
								value={review}
								onChange={this.handleChange}
								// autoFocus={true}
								placeholder="review"
								name="review"
								id="userId"
								type="text"
								className="form-control"
							/>
							{error.username && (
								<div className="alert alert-danger">
									{error.username}
								</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="userId"></label>
							<input
								// ref={this.userName}
								value={sem}
								onChange={this.handleChange}
								// autoFocus={true}
								name="sem"
								id="userId"
								type="text"
								className="form-control"
							/>
							{error.username && (
								<div className="alert alert-danger">
									{error.username}
								</div>
							)}
						</div>

						<div className="form-group">
							<label htmlFor="password"></label>
							<input
								id="password"
								onChange={this.handleChange}
								name="course"
								value={course}
								type="text"
								className="form-control"
							/>
							{error.password && (
								<div className="alert alert-danger">
									{error.password}
								</div>
							)}
						</div>

						<button
							disabled={this.validate()}
							className="btn btn-primary"
						>
							Submit
						</button>

						<button
							className="btn btn-primary"
							onClick={this.fetch}
						>
							fetch
						</button>
						{this.state.fetches.map((e) => (
							<p key={e._id}>{e.review}</p>
						))}
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default TestForm;
