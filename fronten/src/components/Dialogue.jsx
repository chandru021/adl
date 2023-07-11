import React, { Component } from "react";
import "./wrap.css";
import { Grid } from "@mui/material";
import Like from "./Like";
import DisLike from "./Dislike";

class Dialog extends Component {
	state = {};
	render() {
		return (
			<div
				style={{
					backgroundColor: "white",

					height: "fit-content",
					margin: "20px",
					width: "100%",
					borderRadius: "20px",
					padding: 20,
					display: "flex",

					flexWrap: "wrap",
					textAlign: "left",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<i
							style={{
								marginLeft: "5px",
								marginTop: "5px",
							}}
							className={"fa fa-user-secret fa-3x"}
							// aria
						></i>
					</Grid>
					<Grid item xs={1}></Grid>
					<Grid
						item
						xs={11}
						flexGrow
						style={{ whiteSpace: "pre-wrap" }}
					>
						<div
							className="wrapword"
							// style={{ width: }}
						>
							{this.props.comment}
						</div>
					</Grid>
					<Grid item xs={1}>
						<Like
							onLike={this.props.onLike}
							id={this.props.id}
							liked={this.props.liked}
						/>
					</Grid>
					<Grid
						item
						xs={1}
						style={{ fontSize: 30, justifyContent: "end" }}
					>
						{this.props.likes}
					</Grid>
					<Grid item xs={1}>
						<DisLike
							onDisLike={this.props.onDisLike}
							id={this.props.id}
							disLiked={this.props.disLiked}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Dialog;
