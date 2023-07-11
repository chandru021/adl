import React, { Component } from "react";
import axios from "axios";
import "../login.css";
import { toast, ToastContainer } from "react-toastify";

class Login extends Component {
	state = {
		formValues: {
			user_id: "",
			password: "",
			reg_year: "2020",
		},
	};

	handleChange = ({ currentTarget: input }) => {
		// console.log(input.value);

		let x = { ...this.state.formValues };
		// console.log(input.id);
		x[input.id] = input.value;

		this.setState({
			formValues: x,
		});
	};

	handleSubmit = async () => {
		console.log(this.state.formValues);
		let result = await axios.post(
			"http://localhost:3001/login",
			this.state.formValues
		);
		console.log(result);
		if (result.data !== "Invalid") {
			// console.log(result);
			window.location.replace(
				`http://localhost:3000/${this.state.formValues.user_id}/${result.data}/Home`
			);
		} else {
			window.alert(result.data);
			// toast.error(result.data);
		}
	};

	register = async () => {
		console.log(this.state.formValues);
		let result = await axios.post(
			"http://localhost:3001/register",
			this.state.formValues
		);
		if (result.data === "ok") {
			// window.location.replace("http://localhost:3000/Home");
		} else {
			window.alert(result.data);
			// toast.error(result.data);
		}
	};

	changeBatch = ({ currentTarget: input }) => {
		console.log(input.value);
		const reg_year = input.value;
		console.log(reg_year);
		const { formValues } = this.state;
		formValues.reg_year = input.value;

		this.setState({
			formValues,
		});
	};
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<ToastContainer />
					<div className="left-section">
						<div className="header">
							<h1 className="animation a1">WELCOME</h1>
							<h4 className="animation a2"></h4>
						</div>
						<div className="form">
							<input
								value={this.state.id}
								id="user_id"
								onChange={this.handleChange}
								type="email"
								className="form-field animation a3"
								placeholder="Username"
							/>
							<input
								id="password"
								onChange={this.handleChange}
								value={this.state.password}
								type="password"
								className="form-field animation a4"
								placeholder="Password"
							/>

							<button
								className="animation a6"
								onClick={this.handleSubmit}
							>
								LOGIN
							</button>

							<select
								name="Batch"
								// id="cars"
								value={this.state.reg_year}
								onChange={this.changeBatch}
								style={{
									marginTop: "10px",
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

							<button
								className="animation a6"
								onClick={this.register}
							>
								REGISTER
							</button>
						</div>
					</div>
					<div className="right-section"></div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
