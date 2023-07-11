import React, { Component } from "react";
import styled from "styled-components";
import Cursor from "../cursror";
import "../util.css";
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";
import spacing from "@mui/system/esm/spacing";
import { Link } from "react-router-dom";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider/StyledEngineProvider";
let id = "";
class Home extends Component {
	state = {
		top: 0,
		bgimg: "",
		current: 1,
		years: [1, 2, 3, 4],
		labels: ["Freshman", "Sophomore", "Junior", "Senior"],
		images: ["sub.jpg", "second.jpg", "third.jpg", "usa.jpg"],
		content: [
			"Freshman year is an exciting time of self-disc",
			" Sophomore year is a time for academic and perso",
			"Junior year of college is a pivotal moment in ",
			"Senior year of college is a time of reflection,",
		],
	};

	handleHover = (i) => {
		console.log(i);
		this.setState({
			bgimg: this.fetch(i),
			current: i,
		});
	};

	mouseExit = (i) => {
		this.setState({
			bgimg: "",
		});
	};

	fetch = (e) => {
		return this.state.images[e - 1];
	};

	handleScroll = () => {
		this.setState({
			top: 1,
		});
	};
	handleScroll2 = () => {
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
						this.state.top === 0
							? // backgroundColor: "black",
							  {
									backgroundImage: `url("/images/default.jpeg")`,
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									backgroundAttachment: "fixed ",
							  }
							: {
									backgroundColor: "black",
							  }
					}
				>
					<div className="loading2 is-active"></div>
					<Content>
						<Heading>
							<div className="text-effect effect">
								<div className="overlay"></div>
								ABOUT US
							</div>
						</Heading>
						<Bod>
							<Vert>COMMUNION</Vert>
							<Description>
								<div className="text-effect effect">
									<div className="overlay"></div>
									<p>
										What gives characteristics and vigor to
										a work is the passion to “create”,
										<br />
										which originates from one’s love and
										desire to express something deeply.
										<br />
										Under this principle, we have been
										producing numerous works
										<br />
										while respecting the originality of each
										creator.
										<br />
										We wish to create an environment in
										which the energy to cherish things
										<br />
										that inspire and strongly drive one’s
										emotions can be exerted to the fullest
										extent.
										<br />
										In order to realize such an environment,
										we are putting our best efforts not only
										into strengthening in-house production
										<br />
										and establishing education system for
										each department, but also into enhancing
										both the quality and efficiency of our
										works.
										<br />
										We hope that many talents will gather
										here, and with their “creative vitality”
										to consistently produce new works,{" "}
										<br />
										we aim to become a production studio
										with global competence.
									</p>
									<p style={{ letterSpacing: 4 }}>
										TEAM COMMUNION
									</p>
								</div>
							</Description>
						</Bod>
						<BgImage />
					</Content>
				</div>
				<div
					onMouseEnter={this.handleScroll}
					onMouseLeave={this.handleScroll2}
					onMouseMoveCapture={this.handleScroll}
					className="ccontainer"
					style={{
						backgroundColor: "black",
					}}
				>
					<Grid
						container
						spacing={2}
						width={"100vw"}
						height={"100vh"}
						padding={7}
					>
						<Grid item xs={1} style={{ justifyContent: "left" }}>
							<Vert style={{ marginTop: 90, paddingTop: 40 }}>
								COMMUNION
							</Vert>
						</Grid>
						<Grid
							item
							xs={5}
							style={{
								alignContent: "center",
								justifyContent: "center",
								padding: 30,
							}}
						>
							<div
								style={{
									color: "#f9f9f9",
									fontSize: 60,
									padding: 40,
								}}
							>
								YEAR STUDIED
							</div>
							<Stack>
								<Grid container spacing={2}>
									{this.state.years.map((i) => (
										<Grid item xs={6}>
											<div
												style={
													this.state.current !== i
														? { fontWeight: "100" }
														: { fontWeight: "500" }
												}
											>
												<p>
													<Link
														style={{
															textDecoration:
																"inherit",
															color: "#f9f9f9",
															fontSize: 30,
														}}
														to={`/${this.props.routerParams.user_id}/${this.props.routerParams.reg_year}/${i}`}
														onMouseEnter={() => {
															this.handleHover(i);
														}}
														onMouseLeave={
															this.mouseExit
														}
													>
														{
															this.state.labels[
																i - 1
															]
														}
													</Link>
												</p>
											</div>
										</Grid>
									))}
								</Grid>
								<Description>
									<div className="text-effect effect">
										<div className="overlay"></div>
										<p
											style={{
												width: 280,
												fontSize: 24,
												background: "white",
												color: "black",
											}}
										>
											{
												this.state.labels[
													this.state.current - 1
												]
											}{" "}
											year of Study
										</p>
										<p style={{ fontSize: 20 }}>
											{
												this.state.content[
													this.state.current - 1
												]
											}
										</p>
									</div>
								</Description>
							</Stack>
						</Grid>

						<Grid item xs={6}>
							<div className="text-effect effect">
								<div className="overlay"></div>
								<img
									// onHover={this.handleHover}
									className="image image-contain"
									// <img src={require('/images/image-name.png')}

									src={require(`/public/images/${this.fetch(
										this.state.current
									)}`)}
								></img>
							</div>
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

const Content = styled.div`
	margin-bottom: 10vw;
	width: 100%;
	position: relative;
	min-height: 100vh;
	box-sizing: border-box;
	display: flex;
	justify-content: end;
	align-items: center;
	flex-direction: column;
	// padding: 80px 40px;
	height: 100%;
`;

const BgImage = styled.div`
	height: 100%;
	background-position: top;
	background-size: cover;
	background-repeat: no-repeat;
	// background-image: url("/images/doro.jpeg");
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	z-index: -1;
	// filter: blur(px);
	// -webkit-filter: blur(8px);
`;

const Heading = styled.div`
	// text-decoration: underline;
	border-bottom: 3px solid;
	letter-spacing: 4px;
	font-size: 22px;
	color: #f9f9f9;
`;
const Vert = styled.div`
	// text-decoration: underline;
	// font-size: 22px;
	border-top: 3px solid;
	letter-spacing: 4px;
	font-size: 20px;
	max-width: 50px;
	writing-mode: vertical-rl;
	text-orientation: mixed;
	color: #f9f9f9;
`;

const Bod = styled.div`
	width: 100%;
	padding: 50px;
	display: flex;
	// max-height:
	// position: fixed;
	justify-content: top;
	align-items: left;
	flex-direction: row;
`;

const Description = styled.div`
		justify-content: left;
		color: #f9f9f9;
		align-items: left;
		text-align: left;
		width: 100%;
		max-height: 50vh
		display: flex;
		box-sizing: border-box;
		position: relative;
		margin: 50px;
	`;

// const CTA = styled.div`
// 	max-width: 650px;
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// `;

// const CTALogoOne = styled.img`
// 	margin-bottom: 12px;
// 	max-width: 600px;
// 	min-height: 1px;
// 	display: block;
// 	width: 100%;
// `;

// const SignUp = styled.a`
// 	font-weight: bold;
// 	color: #f9f9f9;
// 	background-color: #0063e5;
// 	margin-bottom: 12px;
// 	width: 100%;
// 	letter-spacing: 1.5px;
// 	font-size: 18px;
// 	padding: 16.5px 0;
// 	border: 1px solid transparent;
// 	border-radius: 4px;
// 	&:hover {
// 		background-color: #0483ee;
// 	}
// `;

// const Description = styled.p`
// 	color: hsla(0, 0%, 95.3%, 1);
// 	font-size: 11px;
// 	margin: 0 0 24px;
// 	line-height: 1.5;
// 	letter-spacing: 1.5px;
// `;

// const CTALogoTwo = styled.img`
// 	max-width: 600px;
// 	margin-bottom: 20px;
// 	display: inline-block;
// 	vertical-align: bottom;
// 	width: 100%;
// `;

// export default Login;

//-------------------------=-==============
// const Container = styled.section`
// 	height: 100vh;
// 	background-color: #000000;
// 	// background-image: url("/images/doro.jpeg");
// 	display: flex;
// 	flex-direction: column;
// 	text-align: center;
// 	overflow: hidden;
// `;
// const Section = styled.div`
// 	justify-content: end;
// 	color: #f9f9f9;
// 	align-items: center;
// 	width: 100%;
// 	min-height: 100vh;
// 	display: flex;
// 	box-sizing: border-box;
// 	flex-direction: column;
// 	position: relative;
// 	margin: 30px;
// 	overflow: hidden;
// `;

// const Content = styled.div`
// 	border: 1px solid #000;
// 	background-image: url("/images/doro.jpeg");
// 	height: 100%;
// 	background-position: top;
// 	background-size: cover;
// 	background-repeat: no-repeat;
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	left: 0;
// 	z-index: -1;
// `;

// const BgImage = styled.div`
// 	height: 100%;
// 	background-position: top;
// 	background-size: cover;
// 	background-repeat: no-repeat;
// 	background-image: url("/images/doro.jpeg");
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	left: 0;
// 	z-index: -1;
// `;

// const bgImage = styled.div``;

export default Home;
