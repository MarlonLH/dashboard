import React, { Component } from 'react'
import PanelHeader from '../PanelHeader/PanelHeader'
import WidgetPopup from '../WidgetPopup/WidgetPopup'

import './DashboardPanel.css'

class DashboardPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			numberOfWidgets: 0
		}
		this.widgets = this.props.widgets
		this.widgetId = 0
		this.togglePopup = this.togglePopup.bind(this)
		this.addNewWidget = this.addNewWidget.bind(this)
		this.deleteWidgethandler = this.deleteWidgethandler.bind(this)
		this.moveWidgetHandler = this.moveWidgetHandler.bind(this)
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	addNewWidget(code) {
		if (code === null)
			console.log("C'est null");
		this.widgets.push(code);
		this.setState({ numberOfWidgets: this.props.numberOfWidgets + 1})
		this.widgetId += 1
		this.props.changeWidgets(this.widgets)
	}

	deleteWidgethandler(index) {
		for (let i = 0; this.widgets[i]; i++) {
			if (Number(this.widgets[i].key) === Number(index))
				this.widgets.splice(i, 1)
		}
		this.setState({ numberOfWidgets: this.props.numberOfWidgets - 1})
		this.props.changeWidgets(this.widgets)
	}

	moveWidgetHandler(key, move) {
		let len = 0
		
		for (len = 0; this.widgets[len] != null; len++);

		for (let i = 0; this.widgets[i]; i++) {
			if (Number(this.widgets[i].key) === Number(key)) {
				if (i + move === -1)
					return;
				else if (i + move >= len)
					return;
				let tmp = this.widgets[i + move]
				this.widgets[i + move] = this.widgets[i]
				this.widgets[i] = tmp
				this.setState({ numberOfWidgets: this.state.numberOfWidgets})
				this.props.changeWidgets(this.widgets)
				break;
			}
		}
	}

	render() {
		return (
			<div>
				<div className='dashboardPanel'>
					<PanelHeader
						name='Your Dashboard'
						buttonOn={true}
						setStyle='blueHeaderButton'
						buttonName='Add a new widget'
						onClickButton={() => {this.togglePopup()}}
					/>
					{this.state.showPopup ? 
						<WidgetPopup
							text='Close Me'
							closePopup={this.togglePopup}
							addWidget={this.addNewWidget}
							widgetNumber={this.widgetId}
							deleteWidget={this.deleteWidgethandler}
							moveWidget={this.moveWidgetHandler}
							google={this.props.google}
							github={this.props.github}
							linkedin={this.props.linkedin}
							token={this.props.token}
						/>
						: null
					}
					<div className='widgetsPlaceholder'>
						{this.widgets}
					</div>
				</div>
			</div>
		)
	}
};

export default DashboardPanel;