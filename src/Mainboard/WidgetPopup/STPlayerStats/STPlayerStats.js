import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import STIcon from './../../sources/SteamBlackLogo.png'
import STUserInfo from '../../Widgets/STUserInfo/STUserInfo'

import './../WidgetStyle.css'

class STPlayerStats extends Component {
	state = {
		playerId: '',
		timer: 10
	}

	nameChangeHandler = ( event ) => {
		this.setState({ name: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let keyId =  '18F36663837E85586FF32777A91FA2D5'
		let apiUrl = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + keyId + '&steamids=' + this.state.name

		FetchData(apiUrl).then(res => {
			if (!res.response.players[0]) {
				alert("Wrong ID")
				return;
			}
			let widget = (
				<STUserInfo
					playerId={this.state.name}
					resetTimer={this.state.timer}
					deleteWidget={this.props.deleteWidget.bind(this)}
					moveWidget={this.props.movewidget.bind(this)}
					key={this.props.widgetNumber}
					datakey={this.props.widgetNumber}
					res={res.response.players[0]} />
			)
			this.props.widgetCode(widget)
		});
	}
	render() {
		return (
			<div className='widgetBox'>
				<div className='BlackLogoPlaceholder'>
					<img src={STIcon} alt='ST' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Steam Player Stats :</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show main information of the selected profile</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Player Id : </p>
					<input
						type='text'
						placeholder='Example : 76561197960435530'
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
						<div className='blackButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default STPlayerStats;