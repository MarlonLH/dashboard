import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WeatherIcon from './../../sources/openWeatherMapIcon.png'
import WeatherInfo from '../../Widgets/WeatherInfo/WeatherInfo'

import './../WidgetStyle.css'

class Weather extends Component {
    state = {
        city: '',
        timer: 10
    }

    cityChangeHandler(event) {
        this.setState({ city: event.target.value })
    }

    selectChangeHandler = (event) => {
        this.setState({ timer: event.target.value})
    }

    createWidget = () => {
        let keyId = '1dd7c07ccab94661cbc4c11398db4ce9'
        let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=' + keyId + '&units=metric'

        FetchData(apiUrl).then(res => {
			if (res.name) {
				let widget = (
					<WeatherInfo
						city={this.state.city}
						resetTimer={this.state.timer}
						deleteWidget={this.props.deleteWidget.bind(this)}
						moveWidget={this.props.movewidget.bind(this)}
						key={this.props.widgetNumber}
						datakey={this.props.widgetNumber}
						res={res} />
				)
				this.props.widgetCode(widget)
            } else {
                alert('Wrong City Name')
            }
		})
    }

    render() {
        return (
            <div className='widgetBox'>
                <div className='PurpleLogoPlaceholder'>
                    <img src={WeatherIcon} alt='WT' className='logoWidget'/>
                </div>
                <div className='infoPlaceholder'>
                    <div className='topPart'>
                        <p className='titleStyle'>Weather Info : </p>
                        <div className='widgetTooltip'>i
                            <span className='widgetTooltiptext'>Show the main information about the weather of the city you want</span>
                        </div>
                    </div>
                    <p className='widgetSubtitle'>City Name : </p>
                    <input
                        type='text'
                        placeholder='Example : Montpellier'
                        className='inputWidget'
                        value={this.state.city}
                        onChange={(event) => this.cityChangeHandler(event)}/>
                    <p className='widgetSubtitle'>Refresh timer (in second) : </p>
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

export default Weather;