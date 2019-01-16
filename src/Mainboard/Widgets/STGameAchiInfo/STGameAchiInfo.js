import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import STIcon from './../../sources/SteamBlackLogo.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class STGameAchiInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			appName: this.props.appName,
			tmpNewAppId: this.props.appId,
			tmpNewTimer: this.props.timer,
			seconds: 0
		}
		this.appNameApi = 'https://api.steampowered.com/ISteamApps/GetAppList/v0002/'
		this.urlPart = 'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid='
		this.apiUrl = this.urlPart + this.props.appId + '&format=json'
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
		FetchData(this.appNameApi).then(res => {
			for (let i = 0; res.applist.apps[i]; i = i + 1) {
				if (Number(res.applist.apps[i].appid) === Number(this.state.tmpNewAppId)) {
					this.setState({ appName: res.applist.apps[i].name })
				}
			}
		})
		FetchData(this.apiUrl).then(res => {
			this.setState({ apiRes: res.achievementpercentages.achievements})
		});
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	appIdChangeHandler = ( event ) => {
		this.setState({ tmpNewAppId: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = this.urlPart + this.state.tmpNewAppId + '&format=json'

		FetchData(this.appNameApi).then(res => {
			for (let i = 0; res.applist.apps[i]; i = i + 1) {
				if (Number(res.applist.apps[i].appid) === Number(this.state.tmpNewAppId)) {
					this.setState({ appName: res.applist.apps[i].name })
				}
			}
		})
		FetchData(tmpUrl).then(res => {
			console.log(res)
			if (res) {
				this.setState({
					apiRes: res.achievementpercentages.achievements
				})
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong ID")
			}
		});
	}

	render() {
		let achivements = (
				<div className='allAchivements'>
					{this.state.apiRes.map(( achivement, index ) => {
						return (
							<div className='steamAppNewsContainer' key={'achivement' + index}>
								<span>{achivement.name} : {achivement.percent} %</span>
							</div>
						)
					})}
				</div>
		)

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='youtubeChannelInfoLogoBlack'>
							<img src={STIcon} alt='ST' className='ytciLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>{this.state.appName}</h2>
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
						{achivements}
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
								<p className='widgetSubtitle'>App Id : </p>
								<input
									type='text'
									placeholder='Example : 440 (Team Fortress 2)'
									className='inputWidget'
									value={this.state.appId}
									onChange={(event) => this.appIdChangeHandler(event)}/>
								<div className='trendsFlexDisplay'>
									<div className='trendsSubpart'>
										<p className='youtubeTrendsSubtitle'>Number of news : </p>
										<select value={this.state.count} onChange={(event) => this.countChangeHandler(event)} className='selectTimer'>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={30}>30</option>
											<option value={40}>40</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className='trendsSubpart'>
										<p className='youtubeTrendsSubtitle'>Timer : </p>
										<select value={this.state.timer} onChange={(event) => this.timerChangeHandler(event)} className='selectTimer'>
										<option value={10}>10</option>
										<option value={20}>20</option>
										<option value={30}>30</option>
										<option value={40}>40</option>
										<option value={50}>50</option>
										</select>
									</div>
								</div>
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

export default STGameAchiInfo