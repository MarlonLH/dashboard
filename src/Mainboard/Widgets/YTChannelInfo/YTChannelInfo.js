import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class YTChannelInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewId: this.props.ytName,
			tmpNewTimer: this.props.resetTimer,
			seconds: 0
		}
		this.keyId = 'AIzaSyAc5WiG1YX5lhz7DVUZuVy12ZHyhf_raS4'
		this.urlPart = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername='
		this.apiUrl = this.urlPart + this.props.ytName + '&key=' + this.keyId
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
			this.setState({ apiRes: res.items[0]})
			console.log(this.state.apiRes)
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
		let tmpUrl = this.urlPart + this.state.tmpNewId + '&key=' + this.keyId
		FetchData(tmpUrl).then(res => {
			if (res.items[0]) {
				this.setState({ apiRes: res.items[0]})
				console.log(this.state.apiRes)
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong Channel Name")
			}
		});
	}

	render() {
		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='youtubeChannelInfoLogo'>
							<img src={this.state.apiRes.snippet.thumbnails.medium.url} alt='Avatar' className='youtubeChannelLogo' />
						</div>
						<h2 className='youtubeChannelInfoTitle'>{this.state.apiRes.snippet.title}</h2>
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
						<div className='youtubeChannelDescription'>
							<span>{this.state.apiRes.snippet.description}</span>
						</div>
					</div>
					<div className='secondaryInformation'>
						<p><span>Subscribers : </span>{this.state.apiRes.statistics.subscriberCount}</p>
						<p><span>Views : </span>{this.state.apiRes.statistics.viewCount}</p>
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

export default YTChannelInfo;