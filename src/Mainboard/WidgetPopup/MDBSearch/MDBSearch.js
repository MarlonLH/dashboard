import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import TMDBLogo from './../../sources/tmdbLogo.png'
import MDBSearchInfo from '../../Widgets/MDBSearchInfo/MDBSearchInfo'

import './../WidgetStyle.css'

class MDBSearch extends Component {
	state = {
		language: 'fr-FR',
		texte: '',
		timer: 10
	}

	texteChangeHandler = ( event ) => {
		this.setState({ texte: event.target.value })
	}

	languageChangeHandler = ( event ) => {
		this.setState({ language: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiKey = 'c2d69f66f83536285f3f8c985d407369'
		let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=' + this.state.language + '&query=' + this.state.texte

		console.log(apiUrl)
		FetchData(apiUrl).then(res => {
			if (res) {
				console.log(res)
				let widget = (
					<MDBSearchInfo
						language={this.state.language}
						texte={this.state.texte}
						timer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res} />
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
				<div className='darkGreenLogoPlaceholder'>
					<img src={TMDBLogo} alt='TMDB' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Find movies by name:</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show the movies with the maching name</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Movie name : </p>
					<input
						type='text'
						placeholder='Example : Fast and Furious'
						className='inputWidget'
						value={this.state.texte}
						onChange={(event) => this.texteChangeHandler(event)} />
					<div className='trendsFlexDisplay'>
						<div className='trendsSubpart'>
							<p className='youtubeTrendsSubtitle'>Language : </p>
							<select value={this.state.language} onChange={(event) => this.languageChangeHandler(event)} className='selectTimer'>
								<option value='fr-FR'>French</option>
								<option value='en-GB'>English</option>
								<option value='es-ES'>Spanish</option>
								<option value='fr-CA'>Canadian</option>
								<option value='en-US'>U.S.A.</option>
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
						<div className='darkGreenButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MDBSearch;