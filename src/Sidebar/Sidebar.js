import React, { Component }  from 'react'
import SidebarButton from './SidebarButton/SidebarButton'

import './Sidebar.css'
import Dbw from './sources/dashboardWhite.png'
import Prw from './sources/profileWhite.png'

class Sidebar extends Component {
	constructor ( props ) {
		super(props)
		this.state = {
			idClicked: this.props.selectedId
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.isLoged === true && this.state.idClicked > 1)
			this.setState({ idClicked: 0 })
	}

	_isButtonClicked(id) {
		this.props.changeId(id)
		this.setState({ idClicked: id})
	}

	render() {
		
		let logedOffDiv = (
			<div className='buttonsContainer'>
				<SidebarButton name='Home Page' logo={Dbw} click={() => this._isButtonClicked(2)} isClicked={this.state.idClicked} id={2}/>
				<SidebarButton name='Log in' logo={Prw} click={() => this._isButtonClicked(3)} isClicked={this.state.idClicked} id={3}/>
			</div>
		)

		let logedOnDiv = (
			<div className='buttonsContainer'>
				<SidebarButton name='Dashboard' logo={Dbw} click={() => this._isButtonClicked(0)} isClicked={this.state.idClicked} id={0}/>
				<SidebarButton name='My Profile' logo={Prw} click={() => this._isButtonClicked(1)} isClicked={this.state.idClicked} id={1}/>
			</div>
		)

		return (
			<div className='sidebarMain'>
				<div className='bsDashboard'>
					<div className='logoContainer'>
						<img src='https://scontent-mrs1-1.xx.fbcdn.net/v/t1.15752-9/43131003_324886938284791_7459619789489569792_n.png?_nc_cat=103&oh=10d1d9cd928af7b07e1b91682d95ef0a&oe=5C4C49A6' alt="logo" className='logoStyle'/>
					</div>
					<div className='nameContainer'>
						<h2>Industries</h2>
					</div>
				</div>
				{this.props.isLoged === false && logedOffDiv}
				{this.props.isLoged === true && logedOnDiv}
			</div>
		)
	}
}

export default Sidebar;