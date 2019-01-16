import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import TDIcon from './../../sources/tradeIcon.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class TDNewsInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewValue: this.props.value,
			tmpNewTimer: this.props.timer,
			seconds: 0
		}
		this.apiUrl = 'https://api.iextrading.com/1.0/stock/' + this.props.value + '/batch?types=quote%2Cnews%2Cchart&range=1m&last=10'
	}

	tick() {
		this.setState(prevState => ({
			seconds: prevState.seconds + 1
		}));
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), (this.state.tmpNewTimer * 1000));
	}
		
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	valueChangeHandler(event) {
		this.setState({ tmpNewValue: event.target.value })
	}

	timerChangeHandler(event) {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = 'https://api.iextrading.com/1.0/stock/' + this.state.tmpNewValue + '/batch?types=quote%2Cnews%2Cchart&range=1m&last=10'
		FetchData(tmpUrl).then(res => {
			if (res) {
				this.setState({ 
					apiRes: res.news
				})
			} else {
				alert("Wrong Name")
			}
		});
	}

	render() {
		let allNews = (
				<div className='allNewsContainer'>
					{this.state.apiRes.map(( news, index ) => {
						return (
							<div className='steamAppNewsContainer' key={'tdnews' + index}>
								<h3>{news.headline}</h3>
								<p>Released : {Date(news.datetime)}</p>
								<a target="_blank" href={news.url}>See more ...</a>
							</div>
						)
					})}
				</div>
		)

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='tradeLogoPlaceholder'>
							<img src={TDIcon} alt='ST' className='ytciLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>News</h2>
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
						{allNews}
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
								<p className='widgetSubtitle'>Action name : </p>
								<input
									type='text'
									placeholder='Example : AAPL (Apple)'
									className='inputWidget'
									value={this.state.tmpNewValue}
									onChange={(event) => this.valueChangeHandler(event)}/>
								<p className='widgetSubtitle'>Refresh timer (in second): </p>
								<select value={this.state.tmpNewTimer} onChange={(event) => this.selectChangeHandler(event)} className='selectTimer'>
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
					</div> : null
				}
			</div>
		)
	}
}

export default TDNewsInfo