import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import LFMIcon from './../../sources/lastfmIcon.png'
import LFMSearchAlbumInfo from '../../Widgets/LFMSearchAlbumInfo/LFMSearchAlbumInfo'

import './../WidgetStyle.css'

class LFMSearchAlbum extends Component {
	state = {
		texte: '',
		timer: 10
	}

	texteChangeHandler = ( event ) => {
		this.setState({ texte: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiKey = 'c69ede0d497c26c8d7cd936310224f00'
		let apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=album.search&album=' + this.state.texte + '&api_key=' + apiKey + '&format=json&limit=20'

		console.log(apiUrl)
		FetchData(apiUrl).then(res => {
			if (res) {
				console.log(res.results.albummatches.album)
				let widget = (
					<LFMSearchAlbumInfo
						texte={this.state.texte}
						timer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.results.albummatches.album} />
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
						<p className='titleStyle'>Search album:</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Search for an album</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Search : </p>
					<input
						type='text'
						placeholder='Example : Fire'
						className='inputWidget'
						value={this.state.texte}
						onChange={(event) => this.texteChangeHandler(event)} />
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

export default LFMSearchAlbum;