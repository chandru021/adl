// import logo from "./logo.svg";
import { Routes, Route, Outlet, useParams } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
// import React from "react";
import styled from "styled-components";
import Cursor from "./cursror";
import Nav from "./components/NavBar";
import React, { Component } from "react";
import Subjects from "./components/Sub";
import Reviews from "./components/Review";
import Temp from "./components/temp";

// import Semc from "./components/Sem";
import Semc from "./components/Sem";
// import Company from "./components/Review";
import Review from "./components/Review";

const ReviewWrapper = (props) => {
	const routerParams = useParams();
	let tprops = { ...props };
	return <Review props={tprops} routerParams={routerParams} />;
};
const SubjectsWrapper = (props) => {
	const routerParams = useParams();
	let tprops = { ...props };
	return <Subjects props={tprops} routerParams={routerParams} />;
};
const HomeWrapper = (props) => {
	const routerParams = useParams();
	let tprops = { ...props };
	return <Home props={tprops} routerParams={routerParams} />;
};

const SemWrapper = (props) => {
	const routerParams = useParams();
	let tprops = { ...props };
	return <Semc props={tprops} routerParams={routerParams} />;
};

class App extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<Nav />
				<Cursor />
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route
						path=":user_id/:reg_year/Home"
						element={<HomeWrapper />}
					></Route>
					<Route
						path=":user_id/:reg_year/:year"
						element={<SemWrapper />}
					>
						<Route path=":sem" element={<SubjectsWrapper />}>
							<Route
								path=":courseCode"
								element={<ReviewWrapper />}
							></Route>
						</Route>
					</Route>
				</Routes>

				<Outlet />
			</React.Fragment>
		);
	}
}

export default App;
