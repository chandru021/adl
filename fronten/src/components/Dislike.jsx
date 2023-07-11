import React, { Component } from "react";

class DisLike extends Component {
	state = {};

	render() {
		let name = "fa fa-thumbs";
		if (
			this.props.disLiked === false
				? (name += "-o-down fa-3x fa-flip-horizontal")
				: (name += "-down fa-3x fa-flip-horizontal")
		)
			return (
				<React.Fragment>
					<i
						className={name}
						onClick={() => {
							this.props.onDisLike(this.props.id);
						}}
						// aria-hidden={true}
					></i>
				</React.Fragment>
			);
	}
}

export default DisLike;
