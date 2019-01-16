import React, { Component } from 'react'

import './../WidgetBoardStyle.css'

class WidgetClicker extends Component {
	render() {
		return (
			<img
				onClick={() => this.props.func()}
				src={this.props.src}
				alt={this.props.alt}
				className={this.props.class}/>
		)
	}
}

export default WidgetClicker