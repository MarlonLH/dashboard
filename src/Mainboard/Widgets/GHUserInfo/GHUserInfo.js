import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class GHUserInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewId: this.props.userId,
			tmpNewTimer: this.props.resetTimer,
			seconds: 0
		}
		this.apiUrl = 'https://api.github.com/users/' + this.state.tmpNewId
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
			this.setState({ apiRes: res})
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
		let tmpUrl = 'https://api.github.com/users/' + this.state.tmpNewId
		FetchData(tmpUrl).then(res => {
			if (res) {
				this.setState({ apiRes: res})
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong ID")
			}
		});
	}

	render() {

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='youtubeChannelInfoLogo'>
							<img src={this.state.apiRes.avatar_url} alt='Avatar' className='youtubeChannelLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>{this.state.apiRes.name}</h2>
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
						<div className='countryMainSteam'>
							<a href={this.state.apiRes.html_url} target='_blank'>User id : {this.state.apiRes.login}</a>
						</div>
						<div className='mainSteamInfoPlaceholder'>
							<div className='countryMainSteam'>
								<p>Followers : {this.state.apiRes.followers}</p>
							</div>
							<div className='statusMainSteam'>
								<p>Following : {this.state.apiRes.following}</p>
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
								placeholder='Example : MarlonLH'
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

export default GHUserInfo