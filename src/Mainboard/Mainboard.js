import React, { Component }  from 'react'
import DashboardPanel from './DashboardPanel/DashboardPanel'
import MyProfilePanel from './MyProfilePanel/MyProfilePanel'
import LogInPanel from './LogInPanel/LogInPanel'
import HomePagePanel from './HomePagePanel/HomePagePanel'

import './Mainboard.css'

class Mainboard extends Component {
	constructor ( props ) {
		super(props)
		this.state = {
			actualId: 0,
			widgets: []
		}
		this.changeActualIdHandler = this.changeActualIdHandler.bind(this)
		this.loginIn = this.props.loginIn.bind(this)
		this.changeWidgetHandler = this.changeWidgetHandler.bind(this)
		this.dashboardPanel = (<DashboardPanel
									actualId={this.state.actualId}
									changeWidgets={this.changeWidgetHandler.bind(this)}
									widgets={this.state.widgets}
									google={this.props.google}
									github={this.props.github}
									linkedin={this.props.linkedin}
									token={this.props.token} />)
		this.myProfilePanel = (<MyProfilePanel actualId={this.state.actualId} loginInFunc={this.loginIn}/>)
		this.homePagePanel = (<HomePagePanel actualId={this.state.actualId} changeId={this.changeActualIdHandler.bind(this)}/>)
		this.logInPanel = (<LogInPanel actualId={this.state.actualId} loginInFunc={this.loginIn}/>)
	}

	componentDidUpdate() {
		this.dashboardPanel = (<DashboardPanel
			actualId={this.state.actualId}
			changeWidgets={this.changeWidgetHandler.bind(this)}
			widgets={this.state.widgets}
			google={this.props.google}
			github={this.props.github}
			linkedin={this.props.linkedin}
			token={this.props.token} />)
		this.myProfilePanel = (<MyProfilePanel actualId={this.state.actualId} loginInFunc={this.loginIn}/>)
		this.homePagePanel = (<HomePagePanel actualId={this.state.actualId} changeId={this.changeActualIdHandler.bind(this)}/>)
		this.logInPanel = (<LogInPanel actualId={this.state.actualId} loginInFunc={this.loginIn}/>)
	}

	changeWidgetHandler(widgets) {
		this.setState({ widgets: widgets })
	}

	changeActualIdHandler(id) {
		this.props.changeId(id)
	}

	render() {
		return (
			<div className='mainboard'>
				{this.props.actualId === 0 && this.dashboardPanel}
				{this.props.actualId === 1 && this.myProfilePanel}
				{this.props.actualId === 2 && this.homePagePanel}
				{this.props.actualId === 3 && this.logInPanel}
			</div>
		)
	}
}

export default Mainboard;