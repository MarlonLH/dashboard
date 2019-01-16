import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class WeatherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRes: this.props.res,
            popupOn: false,
            tmpNewId: this.props.city,
            tmpNewTimer: this.props.resetTimer,
            seconds: 0
        }
        this.keyId = '1dd7c07ccab94661cbc4c11398db4ce9'
        this.urlPart = 'https://api.openweathermap.org/data/2.5/weather?q='
        this.apiUrl = this.urlPart + this.props.city + '&appid=' + this.keyId + '&units=metric'
        this.icon = 'https://openweathermap.org/img/w/' + this.state.apiRes.weather[0].icon + '.png'
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
            this.setState({ apiRes: res})
            this.icon = 'https://openweathermap.org/img/w/' + this.state.apiRes.weather[0].icon + '.png'
        });
    }

    changePopupStateHandler() {
        this.setState({popupOn: !this.state.popupOn})
    }

    idChangeHandler(event) {
        this.setState({tmpNewId: event.target.value})
    }

    timerChangeHandler(event) {
        this.setState({tmpNewTimer: event.target.value})
    }

    confirmChangesHandler() {
        let tmpUrl = this.urlPart + this.state.tmpNewId + '&appid=' + this.keyId + '&units=metric'
        FetchData(tmpUrl).then(res => {
            if (res.name) {
                this.setState({apiRes: res})
                this.changePopupStateHandler()
                this.icon = 'https://openweathermap.org/img/w/' + this.state.apiRes.weather[0].icon + '.png'
            }
            else {
                alert("Wrong City Name")
            }
        });
    }

    render() {
        return (
            <div className='ytci'>
                <div className='infoPlaceholder'>
                    <div className='youtubeChannelTop'>
                        <div className='youtubeChannelInfoLogo'>
                            <img src={this.icon} alt='WT' className='ytciLogo'/>
                        </div>
						<h2 className='youtubeChannelInfoTitle'>{this.state.apiRes.name}({this.state.apiRes.sys.country})</h2>
						<div className='youtubeChannelClickers'>
                            <WidgetClicker 
                                func={() => this.changePopupStateHandler()}
                                src={EDITIcon}
                                alt='edit'
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
                    <div className='firstLine'>
						<div className='mainSteamInfoPlaceholder'>
							<div className='countryMainSteam'>
								<p>Temperature : {this.state.apiRes.main.temp}°C</p>
							</div>
							<div className='statusMainSteam'>
								<p>Humidity : {this.state.apiRes.main.humidity}%</p>
							</div>
						</div>
                    </div>
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
							<div>
							<p>City Name : </p>
							<input
								type='text'
								placeholder='Example : Montpellier'
								className='inputWidget'
								value={this.state.tmpNewId}
								onChange={(event) => this.idChangeHandler(event)}/>
							<p>Refresh timer (in second): </p>
							<select value={this.state.tmpNewTimer} onChange={(event) => this.timerChangeHandler(event)} className='selectTimer'>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={30}>30</option>
								<option value={40}>40</option>
								<option value={50}>50</option>
							</select>
							<div className='buttonHolder'>
								<div className='blackButton' onClick={() => {this.confirmChangesHandler()}}>
									Validate
								</div>
							</div>
							</div>
						</div>
					</div> : null
				}
            </div>
        )
    }
}

export default WeatherInfo;