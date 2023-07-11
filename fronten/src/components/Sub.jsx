import React, { Component } from "react";
// import React, { Component } from "react";
import { Stack } from "@mui/system";
import { Paper } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import "../index.css";
import axios from "axios";

class Subjects extends Component {
	state = {
		top: -1,
		bgimg: "",
		current: 0,
		// images: ["even.jpeg", "odd.jpeg"],
		subjects: [],

		labels: [],

		images: ["material.jpeg", "electroChem.jpeg", "01.jpeg", "02.jpeg"],
	};

	componentDidMount = async () => {
		const { year, sem } = this.props.routerParams;
		const result = await axios.get(
			`http://localhost:3001/subjects/${year}/${sem}`
		);
		// console.log(result);
		let subjects = [];
		let labels = [];
		console.log(result);
		if (result.data.length == 0) {
			subjects = [];
			labels = [];
		} else {
			subjects = [...result.data[0].subjects];
			labels = [...result.data[0].labels];
		}
		this.setState({
			subjects,
			labels,
		});
	};

	componentDidUpdate = async (prevProps, prevState) => {
		if (prevProps.routerParams.sem != this.props.routerParams.sem) {
			console.log("changed");
			const { year, sem } = this.props.routerParams;
			const result = await axios.get(
				`http://localhost:3001/subjects/${year}/${sem}`
			);
			// console.log(result);
			let subjects = [];
			let labels = [];
			if (result.data.length == 0) {
				subjects = [];
				labels = [];
			} else {
				subjects = [...result.data[0].subjects];
				labels = [...result.data[0].labels];
			}

			this.setState({
				subjects,
				labels,
			});
		}
	};

	handleHoverEnter = (i) => {
		this.setState({
			top: i,
		});
	};
	handleHoverExit = () => {
		this.setState({
			top: -1,
		});
	};
	render() {
		return (
			<React.Fragment>
				<div
					className="ccontainer"
					style={
						this.state.top !== -1
							? // backgroundColor: "black",
							  {
									// backgroundImage: `url("/images/${
									// 	this.state.images[this.state.top % 4]
									// }")`,
									backgroundColor: "black",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									backgroundAttachment: "fixed ",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
							  }
							: {
									backgroundColor: "black",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									// marginLeft: "500px",
							  }
					}
				>
					<div
						className="scroll"
						style={{
							display: "flex",
							// flexDirection: "row",
							flexWrap: "nowrap",
							// overflowY: "hidden",
							overflowX: "auto",
							// marginTop: 80,
							// marginLeft: 500,

							// justifyContent: "center",
							// alignItems: "center",
							// height: "100%",
							// width: "100%",
						}}
					>
						{this.state.subjects.length !== 0 &&
							this.state.subjects.map((i) => (
								<Link
									to={`${i}`}
									key={i}
									style={{
										textDecoration: "none",
										color: "#f9f9f9",
									}}
								>
									<div
										onMouseEnter={() => {
											this.handleHoverEnter(
												this.state.subjects.indexOf(i)
											);
										}}
										onMouseLeave={this.handleHoverExit}
										style={
											this.state.top ===
											this.state.subjects.indexOf(i)
												? // backgroundColor: "black",
												  {
														backgroundImage: `url("/images/${
															this.state.images[
																this.state.top %
																	4
															]
														}")`,
														backgroundRepeat:
															"no-repeat",
														backgroundSize: "cover",
														backgroundAttachment:
															"fixed ",
														// display: "flex",
														// alignItems: "center",
														// justifyContent: "center",
														width: "25vw",
														borderRadius: "20px",
														padding: "20px",
														margin: "5px",
														height: "80vh",
														// backgroundColor: "black",
														textAlign: "center",
														color: "#f9f9f9",
												  }
												: {
														// width: "500px",
														// minWidth: "400px",
														width: "25vw",
														borderRadius: "20px",
														padding: "20px",
														margin: "5px",
														height: "80vh",
														backgroundColor:
															"white",
														textAlign: "center",
														color: "#000000",
												  }
										}
									>
										<div
											style={{
												display: "flex",
												flexWrap: "wrap",
												direction: "row",
												whiteSpace: "pre-wrap",
												fontSize: 50,
											}}
										>
											{
												this.state.labels[
													this.state.subjects.indexOf(
														i
													)
												]
											}
											{/* {this.state.labels[i[5]]} */}
										</div>
									</div>
								</Link>
							))}
					</div>
				</div>

				<Outlet />
			</React.Fragment>
		);
	}
}

export default Subjects;
