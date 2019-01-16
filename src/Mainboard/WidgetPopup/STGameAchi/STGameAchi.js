import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import STIcon from './../../sources/SteamBlackLogo.png'
import STGameAchiInfo from '../../Widgets/STGameAchiInfo/STGameAchiInfo'

import './../WidgetStyle.css'

class STGameAchi extends Component {
	state = {
		appId: '',
		timer: 10
	}

	appIdChangeHandler = ( event ) => {
		this.setState({ appId: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiUrl = 'https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=' + this.state.appId + '&format=json'
		let appNameApi = 'https://api.steampowered.com/ISteamApps/GetAppList/v0002/'

		FetchData(appNameApi).then(res => {
			for (let i = 0; res.applist.apps[i]; i = i + 1) {
				if (Number(res.applist.apps[i].appid) === Number(this.props.appId)) {
					this.setState({ appName: res.applist.apps[i].name })
				}
			}
		})
		FetchData(apiUrl).then(res => {
			if (res) {
				let widget = (
					<STGameAchiInfo
						appId={this.state.appId}
						timer={this.state.timer}
						appName={this.state.appName}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.achievementpercentages.achievements} />
				)
				this.props.widgetCode(widget)
			} else {
				alert("Wrong ID")
			}
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
						<p className='titleStyle'>Steam game achivements :</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show latest news of an Application</span>
						</div>
					</div>
					<p className='widgetSubtitle'>App Id : </p>
					<input
						type='text'
						placeholder='Example : 440 (Team Fortress 2)'
						className='inputWidget'
						value={this.state.appId}
						onChange={(event) => this.appIdChangeHandler(event)}/>
					<div className='trendsFlexDisplay'>
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
						<div className='blackButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default STGameAchi;