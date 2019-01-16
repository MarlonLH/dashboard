import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import NYTIcon from './../../sources/nytIcon.jpg'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class NYTSearchInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			appName: this.props.appName,
			tmpNewTexte: this.props.texte,
			tmpNewTimer: this.props.timer,
			seconds: 0
		}
		this.apiKey = '5a0006b704cb444daa5f3c78b5d313ca'
		this.urlPart = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='
		this.apiUrl = this.urlPart + this.apiKey + '&q=' + this.props.texte
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
			this.setState({ apiRes: res.response.docs})
		});
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	texteChangeHandler = ( event ) => {
		this.setState({ tmpNewTexte: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = this.urlPart + this.apiKey + '&q=' + this.state.tmpNewTexte

		FetchData(tmpUrl).then(res => {
			if (res) {
				this.setState({ apiRes: res.response.docs })
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong search")
			}
		});
	}

	render() {
		let allNews = (
				<div className='allNewsContainer'>
					{this.state.apiRes.map(( news, index ) => {
						return (
							<div className='steamAppNewsContainer' key={news._id}>
								<h3>{news.headline.main}</h3>
								<p>Released : {Date(news.pub_date)}</p>
								<a target="_blank" href={news.web_url}>See more ...</a>
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
							<img src={NYTIcon} alt='ST' className='ytciLogo'/>
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
								<p className='widgetSubtitle'>App Id : </p>
								<input
									type='text'
									placeholder='Example : Bullshit'
									className='inputWidget'
									value={this.state.tmpNewTexte}
									onChange={(event) => this.texteChangeHandler(event)}/>
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
									<div className='whiteButton' onClick={() => {this.confirmChangesHandler()}}>
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

export default NYTSearchInfo