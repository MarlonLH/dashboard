import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import YTIcon from './../../sources/youtubeSquareWhite.png'
import YTChannelInfo from '../../Widgets/YTChannelInfo/YTChannelInfo'

import './../WidgetStyle.css'

class YTChannel extends Component {
	state = {
		ytName: '',
		timer: 10
	}

	onChangeHandler = ( event ) => {
		this.setState({ ytName: event.target.value })
	}

	selectChangeHandler = ( event ) => {
		this.setState({ timer: event.target.value })
	}

	createWidget = () => {
		let keyId = 'AIzaSyAc5WiG1YX5lhz7DVUZuVy12ZHyhf_raS4'
		let apiUrl = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=' + this.state.ytName + '&key=' + keyId

		FetchData(apiUrl).then(res => {
			if (res.items && res.items[0]) {
				let widget = (
					<YTChannelInfo
						ytName={this.state.ytName}
						resetTimer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res.items[0]}/>
				)
				this.props.widgetCode(widget)
			} else {
				alert('Wrong Channel Name')
			}
		})
	}

	render() {
		return (
			<div className='widgetBox'>
				<div className='RedLogoPlaceholder'>
					<img src={YTIcon} alt='YT' className='logoWidget'/>
				</div>
				<div className='infoPlaceholder'>
					<div className='topPart'>
						<p className='titleStyle'>Channel Info</p>
						<div className="widgetTooltip">i
							<span className="widgetTooltiptext">Show the main information of the channel you want</span>
						</div>
					</div>
					<p className='widgetSubtitle'>Channel Url : </p>
					<input
						type='text'
						placeholder='Example : ZeratoRSC2'
						className='inputWidget'
						value={this.state.ytName}
						onChange={(event) => this.onChangeHandler(event)}/>
					<p className='widgetSubtitle'>Refresh timer (in second): </p>
					<select value={this.state.timer} onChange={(event) => this.selectChangeHandler(event)} className='selectTimer'>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={30}>30</option>
						<option value={40}>40</option>
						<option value={50}>50</option>
					</select>
					<div className='buttonHolder'>
						<div className='redButton' onClick={this.createWidget}>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default YTChannel;