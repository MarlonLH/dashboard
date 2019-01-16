import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import NYTIcon from './../../sources/nytIcon.jpg'
import NYTSearchInfo from '../../Widgets/NYTSearchInfo/NYTSearchInfo'

import './../WidgetStyle.css'

class NYTSearch extends Component {
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
		let apiKey = '5a0006b704cb444daa5f3c78b5d313ca'
		let apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiKey + '&q=' + this.state.texte

		console.log(apiUrl)
		FetchData(apiUrl).then(res => {
			if (res) {
				console.log(res.response.docs)
				let widget = (
					<NYTSearchInfo
						texte={this.state.texte}
						timer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.response.docs} />
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
				<div className='WhiteLogoPlaceholder'>
					<img src={NYTIcon} alt='TMDB' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Search specific news:</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show news mathing your query</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Search : </p>
					<input
						type='text'
						placeholder='Example : Bullshit'
						className='inputWidget'
						value={this.state.texte}
						onChange={(event) => this.texteChangeHandler(event)} />
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
						<div className='whiteButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NYTSearch;