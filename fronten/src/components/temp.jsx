import React, { Component } from "react";
import Like from "./Like";

class Temp extends Component {
	state = {};
	render() {
		return (
			// <div
			// 	style={{
			// 		width: "100px",
			// 		height: "100px",
			// 		backgroundColor: "black",
			// 		padding: "40px",
			// 	}}
			// >
			// 	<div
			// 		style={{
			// 			backgroundColor: "white",
			// 		}}
			// 	></div>
			// </div>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					alignContent: "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				<Like liked={true} />
			</div>
		);
	}
}

export default Temp;
