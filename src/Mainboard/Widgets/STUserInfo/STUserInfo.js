import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class STUserInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewId: this.props.playerId,
			tmpNewTimer: this.props.resetTimer,
			seconds: 0
		}
		this.keyId =  '18F36663837E85586FF32777A91FA2D5'
		this.urlPart = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' 
		this.apiUrl = this.urlPart + this.keyId + '&steamids=' + this.props.playerId
	}

	tick() {
		this.setState(prevState => ({
			seconds: prevState.seconds + 1
        }));
	}
		
	componentWillUnmount() {
		clearInterval(this.interval);
	}

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), (this.state.tmpNewTimer * 1000));
		FetchData(this.apiUrl).then(res => {
			this.setState({ apiRes: res.response.players[0]})
		});
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	idChangeHandler(event) {
		this.setState({ tmpNewId: event.target.value })
	}

	timerChangeHandler(event) {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = this.urlPart + this.keyId + '&steamids=' + this.state.tmpNewId
		FetchData(tmpUrl).then(res => {
			if (res.response.players[0]) {
				this.setState({ apiRes: res.response.players[0]})
				console.log(this.state.apiRes)
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong ID")
			}
		});
	}

	render() {

		let status = 'Offline'
		let statusStyle = 'offlineStatus'

		if (this.state.apiRes.personastate === 1) {
			status = 'Online'
			statusStyle = 'onlineStatus'
		} else if (this.state.apiRes.personastate === 2) {
			status = 'Busy'
			statusStyle = 'busyStatus'
		} else if (this.state.apiRes.personastate === 3) {
			status = 'Away'
			statusStyle = 'awayStatus'
		} else if (this.state.apiRes.personastate === 4) {
			status = 'Snooze'
			statusStyle = 'snoozeStatus'
		} else if (this.state.apiRes.personastate === 5) {
			status = 'Looking to trade'
			statusStyle = 'onlineStatus'
		} else if (this.state.apiRes.personastate === 6) {
			status = 'Looking to play'
			statusStyle = 'onlineStatus'
		}

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='youtubeChannelInfoLogo'>
							<img src={this.state.apiRes.avatarfull} alt='Avatar' className='youtubeChannelLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>{this.state.apiRes.personaname}</h2>
						<div className='youtubeChannelClickers'>
							<WidgetClicker
									func={() => this.changePopupStateHandler()}
									src={EDITIcon}
									alt='Edit'
									class='redCross'/>
							<WidgetClicker
									func={() => this.props.moveWidget(this.props.datakey, -1)}
									src={UPIcon}
									alt='UP'
									class='redCross'/>
							<WidgetClicker
									func={() => this.props.moveWidget(this.props.datakey, 1)}
									src={DOWNIcon}
									alt='DOWN'
									class='redCross'/>
							<WidgetClicker
									func={() => this.props.deleteWidget(this.props.datakey)}
									src={materialRedCross}
									alt='X'
									class='redCross'/>
						</div>
					</div>
					<div className='firstLine'>
						<div className='mainSteamInfoPlaceholder'>
							<div className='countryMainSteam'>
								<p>Country : {this.state.apiRes.loccountrycode}</p>
							</div>
							<div className='statusMainSteam'>
								<p>Status : <span className={statusStyle}>{status}</span></p>
							</div>
						</div>
					</div>
				</div>
				{
					this.state.popupOn === true ?
					<div className='popup'>
						<div className='popupMidification'>
							<div align='right' className='popupHeader'>
								<div className='popupClose'>
									<img
										onClick={() => {this.changePopupStateHandler()}}
										src={materialRedCross}
										alt='X'
										className='popupCross'/>
								</div>
							</div>
							<div>
							<p>Player Id : </p>
							<input
								type='text'
								placeholder='Example : http://steamcommunity.com/profiles/(steamId)'
								className='inputWidget'
								value={this.state.tmpNewId}
								onChange={(event) => this.idChangeHandler(event)}/>
							<p>Refresh timer (in second): </p>
							<select value={this.state.tmpNewTimer} onChange={(event) => this.timerChangeHandler(event)} className='selectTimer'>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={30}>30</option>
								<option value={40}>40</option>
								<option value={50}>50</option>
							</select>
							<div className='buttonHolder'>
								<div className='blackButton' onClick={() => {this.confirmChangesHandler()}}>
									Validate
								</div>
							</div>
							</div>
						</div>
					</div> : null
				}
			</div>
		)
	}
}

export default STUserInfo