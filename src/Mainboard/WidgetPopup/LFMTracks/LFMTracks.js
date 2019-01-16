import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import LFMIcon from './../../sources/lastfmIcon.png'
import LFMTracksInfo from '../../Widgets/LFMTracksInfo/LFMTracksInfo'

import './../WidgetStyle.css'

class LFMTracks extends Component {
	state = {
		genre: '',
		timer: 10
	}

	genreChangeHandler = ( event ) => {
		this.setState({ genre: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiKey = 'c69ede0d497c26c8d7cd936310224f00'
		let apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=' + this.state.genre + '&api_key=' + apiKey + '&format=json&limit=20'

		console.log(apiUrl)
		FetchData(apiUrl).then(res => {
			if (res) {
				console.log(res)
				let widget = (
					<LFMTracksInfo
						genre={this.state.genre}
						timer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.tracks.track} />
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
				<div className='LFMLogoPlaceholder'>
					<img src={LFMIcon} alt='LFM' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Top Tracks by genre:</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show the top tracks of the genre you choose</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Music genre : </p>
					<input
						type='text'
						placeholder='Example : disco'
						className='inputWidget'
						value={this.state.genre}
						onChange={(event) => this.genreChangeHandler(event)} />
					<div className="trendsFlexDisplay">
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
						<div className='LFMButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LFMTracks;