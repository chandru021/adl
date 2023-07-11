import React, { Component } from "react";
import { Stack } from "@mui/system";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../index.css";
//import "/Users/alanturing/Documents/miniprojects/communion/frontend/src/components/sem.css";

class Sem extends Component {
	state = {
		top: 0,
		bgimg: "",
		current: 0,
		images: ["even.jpeg", "evenx.jpeg"],
	};

	handleHoverEnter = (i) => {
		this.setState({
			top: i,
		});
	};
	handleHoverExit = () => {
		this.setState({
			top: 0,
		});
	};
	render() {
		return (
			<React.Fragment>
				<div
					className="ccontainer"
					style={
						this.state.top !== 0
							? // backgroundColor: "black",
							  {
									backgroundImage: `url("/images/${
										this.state.images[this.state.top - 1]
									}")`,
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
							  }
					}
				>
					<Stack direction="row" spacing={10}>
						<Link
							to="2"
							style={{ textDecoration: "none" }} // add this style to remove underline
						>
							<div
								elevation={3}
								style={{
									width: 500,
									height: 500,
								}}
							>
								<img
									className="image image-contain"
									src={require(`../even.jpeg`)}
									onMouseEnter={() => {
										this.handleHoverEnter(1);
									}}
									onMouseLeave={this.handleHoverExit}
								/>
								<div>
									<div
										style={{
											fontSize: "24px",
											color: "white",
											// color: "inherit",
											padding: "10px",
											fontWeight: "bold",
										}}

										// 								position: absolute;
										// top: 100;
										// /* top: 50%;
										// left: 50%; */
										// transform: translate(-50%, -50%);
										// background-color: rgba(0, 0, 0, 0.7);
										// color: white;
										// padding: 10px;
										// font-size: 24px;
										// font-weight: bold;
									>
										Even Semester
									</div>
								</div>
							</div>
						</Link>

						<div
							elevation={3}
							style={{
								minWidth: 500,
								minHeight: 500,
							}}
						>
							<Link
								to="1"
								style={{ textDecoration: "none" }} // add this style to remove underline
							>
								<div
									elevation={3}
									style={{
										width: 500,
										height: 500,
									}}
								>
									<img
										className="image image-contain"
										src={require(`../evenx.jpeg`)}
										onMouseEnter={() => {
											this.handleHoverEnter(2);
										}}
										onMouseLeave={this.handleHoverExit}
									/>

									<div>
										<div
											style={{
												fontSize: "24px",
												color: "white",
												// color: "inherit",
												padding: "10px",
												fontWeight: "bold",
											}}

											// 								position: absolute;
											// top: 100;
											// /* top: 50%;
											// left: 50%; */
											// transform: translate(-50%, -50%);
											// background-color: rgba(0, 0, 0, 0.7);
											// color: white;
											// padding: 10px;
											// font-size: 24px;
											// font-weight: bold;
										>
											Odd Semester
										</div>
									</div>
								</div>
							</Link>
						</div>
					</Stack>
				</div>
				<Outlet />
			</React.Fragment>
		);
	}
}

export default Sem;
