import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import TDIcon from './../../sources/tradeIcon.png'
import TDNewsInfo from './../../Widgets/TDNewsInfo/TDNewsInfo'

import './../WidgetStyle.css'

class TDNews extends Component {
	state = {
		value: 'AAPL',
		timer: 10
	}

	valueChangeHandler = ( event ) => {
		this.setState({ value: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let apiUrl = 'https://api.iextrading.com/1.0/stock/' + this.state.value + '/batch?types=quote%2Cnews%2Cchart&range=1m&last=10'

		console.log(apiUrl)
		FetchData(apiUrl).then(res => {
			console.log(res)
			if (res) {
				let widget = (
					<TDNewsInfo
						value={this.state.value}
						timer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.news} />
				)
				this.props.widgetCode(widget) 
			} else {
				alert("Wrong Name")
			}
		});
	}
	render() {
		return (
			<div className='widgetBox'>
				<div className='WhiteLogoPlaceholder'>
					<img src={TDIcon} alt='TRADE' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Action news:</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show the news of an action</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Action name : </p>
					<input
						type='text'
						placeholder='Example : AAPL (Apple)'
						className='inputWidget'
						value={this.state.value}
						onChange={(event) => this.valueChangeHandler(event)}/>
					<p className='widgetSubtitle'>Refresh timer (in second): </p>
					<select value={this.state.timer} onChange={(event) => this.selectChangeHandler(event)} className='selectTimer'>
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
		)
	}
}

export default TDNews;