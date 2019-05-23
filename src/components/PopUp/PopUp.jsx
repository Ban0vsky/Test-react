import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './PopUp.css';

export class PopUp extends Component {
	render() {
		return ReactDOM.createPortal(
			<div className="popUpContainer">
				<section style={this.props.csvInfo ? {height : "300px"} : {}}>
					<i className="fas fa-times" onClick={this.props.setToggle} />
					<div className="content">
						{this.props.children}
					</div>
				</section>
			</div>,
			document.querySelector('#modal')
		);
	}
}
