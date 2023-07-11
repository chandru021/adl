import React, { Component } from "react";

class Like extends Component {
	state = {};

	render() {
		let name = "fa fa-thumbs";
		if (
			this.props.liked === false
				? (name += "-o-up fa-3x")
				: (name += "-up fa-3x")
		)
			return (
				<React.Fragment>
					<i
						className={name}
						onClick={() => {
							this.props.onLike(this.props.id);
						}}
						// aria-hidden={true}
					></i>
				</React.Fragment>
			);
	}
}

export default Like;
