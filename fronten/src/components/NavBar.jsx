import React, { Component } from "react";
import styled from "styled-components";
import "../navBar.css";
import "../index.css";
// window.addEventListener("click", (e) => {
// 	document.querySelector("body").style.backgroundImage =
// 		"url('/images/doro.jpeg')";
// });

class Nav extends Component {
	state = {};
	render() {
		return (
			<Navbar>
				<Logo>
					<img src="/images/logo.png"></img>
				</Logo>
				<div className="component v2">
					<div className="rightContent1">
						{/* <a href="">LOGIN</a> */}
					</div>
				</div>
				{/* <div className="rightContent2">BROWSING</div> */}
			</Navbar>
		);
	}
}

const Navbar = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 90px;
	background-color: transparent;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 36px;
	letter-spacing: 16px;
	z-index: 3;
`;

const Logo = styled.a`
	padding: 0;
	width: 120px;
	margin-top: 4px;
	max-height: 120px;
	font-size: 0;
	display: inline-block;
	img {
		display: block;
		width: 100%;
	}
`;

export default Nav;
