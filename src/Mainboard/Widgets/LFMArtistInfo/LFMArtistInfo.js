import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import LFMIcon from './../../sources/lastfmIcon.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class LFMArtistInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewGenre: this.props.genre,
			tmpNewTimer: this.props.timer,
			seconds: 0
		}
		this.apiKey = 'c69ede0d497c26c8d7cd936310224f00'
		this.urlPart = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='
		this.apiUrl = this.urlPart + this.state.tmpNewGenre + '&api_key=' + this.apiKey + '&format=json&limit=20'
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
			this.setState({ apiRes: res.topartists.artist })
		})
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	genreChangeHandler = ( event ) => {
		this.setState({ tmpNewGenre: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = this.urlPart + this.state.tmpNewGenre + '&api_key=' + this.apiKey + '&format=json&limit=20'
	
		FetchData(tmpUrl).then(res => {
			console.log(res)
			if (res) {
				this.setState({ apiRes: res.topartists.artist })
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong Genre")
			}
		});
	}

	/*   */

	render() {

		let artists = (
			<div className='movieFirstDiv'>
				{this.state.apiRes.map(( artist, index ) => {
					return (
						<div className='moviemainView' key={'artist' + index}>
							<img
								className='movieimage'
								src={artist.image[3]["#text"]}
								alt='Logo'
							/>
							<div className='movietextZone'>
								<div className='movieheaderZone'>
									<span className='movietitleText'>
										{artist.name}
									</span>
								</div>
								<div className='moviedescriptionZone'>
								</div>
								<div className='moviedateZone'>
									<a className='moviedateText' href={artist.url} target='_blank'>See more ...</a>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='LFMLogoPlaceholder'>
							<img src={LFMIcon} alt='LFM' className='ytciLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>Top Artists</h2>
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
					{artists}
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
							<p>Search : </p>
							<input
								type='text'
								placeholder='Example : Disco'
								className='inputWidget'
								value={this.state.tmpNewGenre}
								onChange={(event) => this.genreChangeHandler(event)}/>
							<p>Refresh timer (in second): </p>
							<div className='trendsFlexDisplay'>
								<div className='trendsSubpart'>
									<p className='youtubeTrendsSubtitle'>Timer : </p>
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
								<div className='LFMButton' onClick={() => {this.confirmChangesHandler()}}>
									Validate
								</div>
							</div>
						</div>
					</div> : null
				}
			</div>
		)
	}
}

export default LFMArtistInfo