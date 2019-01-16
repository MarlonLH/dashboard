import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import STIcon from './../../sources/SteamBlackLogo.png'
import STAppNewsInfo from '../../Widgets/STAppNewsInfo/STAppNewsInfo'

import './../WidgetStyle.css'

class STAppNews extends Component {
	state = {
		appId: '',
		count: 10,
		timer: 10
	}

	appIdChangeHandler = ( event ) => {
		this.setState({ appId: event.target.value })
	}

	countChangeHandler = ( event ) => {
		this.setState({ count: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiUrl = ' https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=' + this.state.appId + '&count=' + this.state.count + '&maxlength=300&format=json'
		let appNameApi = 'https://api.steampowered.com/ISteamApps/GetAppList/v0002/'
		let gameName = ''
	
		FetchData(appNameApi).then(res => {
			for (let i = 0; res.applist.apps[i]; i = i + 1) {
				if (Number(res.applist.apps[i].appid) === Number(this.state.appId))
					gameName = res.applist.apps[i].name
			}
			if (gameName === '') {
				alert("Wrong ID")
			}
		})
		FetchData(apiUrl).then(res => {
			if (res.appnews.newsitems && res.appnews.newsitems[0]) {
				console.log("Lol ? :", gameName)
				let widget = (
					<STAppNewsInfo
						appId={this.state.appId}
						timer={this.state.timer}
						count={this.state.count}
						appName={gameName}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.appnews.newsitems} />
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
						<p className='titleStyle'>Steam App News :</p>
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
						<div className='blackButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default STAppNews;