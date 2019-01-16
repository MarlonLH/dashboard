import React , { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import YTIcon from './../../sources/youtubeSquareWhite.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class YTTrendsInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewCountry: this.props.country,
			tmpNewSize: this.props.pageSize,
			tmpNewTimer: this.props.resetTimer,
			seconds: 0
		}
		this.resetTimer = this.props.resetTimer
		this.keyId = 'AIzaSyAc5WiG1YX5lhz7DVUZuVy12ZHyhf_raS4'
		this.urlPart = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults='
		this.apiUrl = this.urlPart + this.props.pageSize + '&regionCode=' + this.props.country + '&key=' + this.keyId
		this.title = ''
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
			this.setState({ apiRes: res.items})
			console.log(this.state.apiRes)
		});
		this.setState({
			tmpNewId: this.props.ytName,
			tmpNewTimer: this.props.resetTimer
		})
	}

	showSimplifiedNumbers( num ) {
		let newNum = "";
		let size = 0;

		for(size = 0; num[size]; size = size + 1);
		if (size === 5 || size === 6) {
			for (let max = size - 3, min = 0; min < max; min = min + 1)
				newNum += num[min];
			newNum += " k views"
		} else if (size === 7 || size === 8 || size === 9) {
			for (let max = size - 6, min = 0; min < max; min = min + 1)
				newNum += num[min];
			newNum += " M views"
		}
		return newNum;
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	countryChangeHandler(event) {
		this.setState({ tmpNewCountry: event.target.value })
	}

	pageSizeChangeHandler(event) {
		this.setState({ tmpNewSize: event.target.value })
	}

	timerChangeHandler(event) {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = this.urlPart + this.state.tmpNewSize + '&regionCode=' + this.state.tmpNewCountry + '&key=' + this.keyId
		FetchData(tmpUrl).then(res => {
			if (res.items) {
				this.resetTimer = this.state.tmpNewTimer
				this.setState({ apiRes: res.items})
				console.log(this.state.apiRes)
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong Channel Name")
			}
		});
	}

	render() {
		if (this.state.tmpNewCountry === 'FR')
			this.title = 'Trends in France'
		else if (this.state.tmpNewCountry === 'GB')
			this.title = 'Trends in England';
		else if (this.state.tmpNewCountry === 'ES')
			this.title = 'Trends in Spain';
		else if (this.state.tmpNewCountry === 'US')
			this.title = 'Trends in the U.S.A.';
		else if (this.state.tmpNewCountry === 'DE')
			this.title = 'Trends in Germany';

		let videos = (
			<div className='ytTrendsMainDiv'>
				{this.state.apiRes.map(( video, index ) => {
					return (
						<div className='ytVideoInfoPlaceholder' key={video.id}>
							<iframe
								className='youtubeVideoStyling'
								width={210}
								height={118}
								src={'https://www.youtube.com/embed/' + video.id}
								title={video.snippet.title}
								/>
							<div className='ytVideoTitlePlaceholder'>
								<p className='block-with-text'>{video.snippet.title}</p>
							</div>
							<p className='youtubeChannelName'>{video.snippet.channelTitle}</p>
							<p className='youtubeChannelName'>{this.showSimplifiedNumbers(video.statistics.viewCount, video.snippet.publishedAt)}</p>
						</div>
					)
				})}
			</div>
		)

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='RedLogoPlaceholderInfo'>
							<img src={YTIcon} alt='YT' className='ytciLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>{this.title}</h2>
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
					{videos}
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
								<div className='trendsFlexDisplay' style={{padding: '1em'}}>
									<div className='trendsSubpart'>
										<p className='youtubeTrendsSubtitle'>Country : </p>
										<select value={this.state.tmpNewCountry} onChange={(event) => this.countryChangeHandler(event)} className='selectTimer'>
											<option value='FR'>France</option>
											<option value='GB'>England</option>
											<option value='ES'>Spain</option>
											<option value='US'>U.S.A.</option>
											<option value='DE'>German</option>
										</select>
									</div>
									<div className='trendsSubpart'>
										<p className='youtubeTrendsSubtitle'>Number of video : </p>
										<select value={this.state.tmpNewSize} onChange={(event) => this.pageSizeChangeHandler(event)} className='selectTimer'>
										<option value={10}>10</option>
										<option value={20}>20</option>
										<option value={30}>30</option>
										<option value={40}>40</option>
										<option value={50}>50</option>
										</select>
									</div>
									<div className='trendsSubpart'>
										<p className='youtubeTrendsSubtitle'>Refresh timer (in second): </p>
										<select value={this.state.tmpNewTimer} onChange={(event) => this.timerChangeHandler(event)} className='selectTimer'>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={30}>30</option>
											<option value={40}>40</option>
											<option value={50}>50</option>
										</select>
									</div>
								</div>
								<div className='buttonHolder'>
									<div className='redButton' onClick={() => {this.confirmChangesHandler()}}>
										Validate
									</div>
								</div>
							</div>
						</div>
					</div> : null
				}
				</div>
			</div>
		)
	}
}
export default YTTrendsInfo;