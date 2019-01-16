import React , { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import YTIcon from './../../sources/youtubeSquareWhite.png'
import YTTrendsInfo from '../../Widgets/YTTrendsInfo/YTTrendsInfo'

import './../WidgetStyle.css'

class YTTrends extends Component {
	state = {
		country: 'FR',
		timer: 10,
		pageSize: 10
	}

	countryChangeHandler = ( event ) => {
		this.setState({ country: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	pageSizeChangeHandler = ( event ) => {
		this.setState({ pageSize: event.target.value })
	}

	createWidget = () => {
		let keyId = 'AIzaSyAc5WiG1YX5lhz7DVUZuVy12ZHyhf_raS4'
		let apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=' + this.state.pageSize + '&regionCode=' + this.state.country + '&key=' + keyId

		FetchData(apiUrl).then(res => {
			if (res.items && res.items[0]) {
				let widget = (
					<YTTrendsInfo
						country={this.state.country}
						resetTimer={this.state.timer}
						pageSize={this.state.pageSize}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.items} />
				)
				this.props.widgetCode(widget)
			} 
		})
	}

	render() {
		return (
			<div className='widgetBox'>
				<div className='RedLogoPlaceholder'>
					<img src={YTIcon} alt='YT' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Youtube Trends :</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Choose in wich country trends you want to see</span>
						</div>
					</div>
					<div className='trendsFlexDisplay'>
						<div className='trendsSubpart'>
							<p className='youtubeTrendsSubtitle'>Country : </p>
							<select value={this.state.country} onChange={(event) => this.countryChangeHandler(event)} className='selectTimer'>
								<option value='FR'>France</option>
								<option value='GB'>England</option>
								<option value='ES'>Spain</option>
								<option value='US'>U.S.A.</option>
								<option value='DE'>German</option>
							</select>
						</div>
						<div className='trendsSubpart'>
							<p className='youtubeTrendsSubtitle'>Number of video : </p>
							<select value={this.state.pageSize} onChange={(event) => this.pageSizeChangeHandler(event)} className='selectTimer'>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={30}>30</option>
							<option value={40}>40</option>
							<option value={50}>50</option>
							</select>
						</div>
					</div>
					<div>
						<p className='widgetSubtitle'>Refresh timer (in second): </p>
						<select value={this.state.timer} onChange={(event) => this.timerChangeHandler(event)} className='selectTimer'>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={30}>30</option>
							<option value={40}>40</option>
							<option value={50}>50</option>
						</select>
					</div>
					<div className='buttonHolder'>
						<div className='redButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default YTTrends;