import React, { Component } from 'react'
import YTIcon from './../../sources/youtubeSquareWhite.png'

class FakeWidget extends Component {
	render () {
		return (
			<div className='fakeWidgetBox'>
				<div className='RedLogoPlaceholder'>
					<img src={YTIcon} alt='YT' className='logoWidget'/>
				</div>
				<div className='infoPlaceholderFake'>
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
						className='inputWidget' />
					<p className='widgetSubtitle'>Refresh timer (in second): </p>
					<select className='selectTimer'>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={30}>30</option>
						<option value={40}>40</option>
						<option value={50}>50</option>
					</select>
					<div className='buttonHolder'>
						<div className='redButton'>
							Validate
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default FakeWidget