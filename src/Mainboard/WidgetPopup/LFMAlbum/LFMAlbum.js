import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import LFMIcon from './../../sources/lastfmIcon.png'
import LFMAlbumInfo from '../../Widgets/LFMAlbumInfo/LFMAlbumInfo'

import './../WidgetStyle.css'

class LFMAlbum extends Component {
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
		let apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=' + this.state.genre + '&api_key=' + apiKey + '&format=json'

		console.log(apiUrl)
		FetchData(apiUrl).then(res => {
			if (res) {
				console.log(res.albums.album[0])
				let widget = (
					<LFMAlbumInfo
						genre={this.state.genre}
						timer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.albums.album} />
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
						<p className='titleStyle'>Top album by genre:</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show the top album of the genre you choose</span>
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

export default LFMAlbum;