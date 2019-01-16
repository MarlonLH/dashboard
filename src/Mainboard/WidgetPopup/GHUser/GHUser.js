import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import GHIcon from './../../sources/githubLogo.png'
import GHUserInfo from '../../Widgets/GHUserInfo/GHUserInfo'

import './../WidgetStyle.css'

class GHUser extends Component {
	state = {
		userId: '',
		timer: 10
	}

	nameChangeHandler = ( event ) => {
		this.setState({ userId: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiUrl = 'https://api.github.com/users/' + this.state.userId

		FetchData(apiUrl).then(res => {
			console.log(res)
			if (!res) {
				alert("Wrong User Name")
				return;
			}
			let widget = (
				<GHUserInfo
					userId={this.state.userId}
					resetTimer={this.state.timer}
					deleteWidget={this.props.deleteWidget.bind(this)}
					moveWidget={this.props.movewidget.bind(this)}
					key={this.props.widgetNumber}
					datakey={this.props.widgetNumber}
					res={res} />
			)
			this.props.widgetCode(widget)
		});
	}
	render() {
		return (
			<div className='widgetBox'>
				<div className='WhiteLogoPlaceholder'>
					<img src={GHIcon} alt='ST' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Github User Info :</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show main information of the selected user</span>
						</div>
					</div>
					<p className='widgetSubtitle'>User Id : </p>
					<input
						type='text'
						placeholder='Example : MarlonLH'
						className='inputWidget'
						value={this.state.ytUrl}
						onChange={(event) => this.nameChangeHandler(event)}/>
					<p className='widgetSubtitle'>Refresh timer (in second): </p>
					<select value={this.state.timer} onChange={(event) => this.selectChangeHandler(event)} className='selectTimer'>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={30}>30</option>
						<option value={40}>40</option>
						<option value={50}>50</option>
					</select>
					<div className='buttonHolder'>
						<div className='whiteButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default GHUser;