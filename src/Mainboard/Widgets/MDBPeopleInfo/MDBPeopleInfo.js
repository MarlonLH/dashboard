import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import TMDBLogo from './../../sources/tmdbLogo.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class MDBPeopleInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: this.props.res,
			popupOn: false,
			tmpNewTexte: this.props.texte,
			tmpNewLanguage: this.props.language,
			tmpNewTimer: this.props.timer,
			seconds: 0
		}
		this.apiKey = 'c2d69f66f83536285f3f8c985d407369'
		this.urlPart = 'https://api.themoviedb.org/3/search/person?api_key='
		this.apiUrl = this.urlPart + this.apiKey + '&language=' + this.props.language + '&query=' + this.props.texte
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
		let tmpUrl = this.urlPart + this.apiKey + '&language=' + this.state.tmpNewLanguage + '&query=' + this.state.tmpNewTexte
	
		FetchData(tmpUrl).then(res => {
			this.setState({ apiRes: res })
		})
	}

	changePopupStateHandler() {
		this.setState({ popupOn: !this.state.popupOn })
	}

	languageChangeHandler(event) {
		this.setState({ tmpNewLanguage: event.target.value })
	}

	texteChangeHandler = ( event ) => {
		this.setState({ tmpNewTexte: event.target.value })
	}

	timerChangeHandler = ( event ) => {
		this.setState({ tmpNewTimer: event.target.value })
	}

	confirmChangesHandler() {
		let tmpUrl = this.urlPart + this.apiKey + '&language=' + this.state.tmpNewLanguage + '&query=' + this.state.tmpNewTexte
	
		FetchData(tmpUrl).then(res => {
			console.log(res)
			if (res) {
				this.setState({ apiRes: res })
				this.changePopupStateHandler()
			}
			else {
				alert("Wrong Country")
			}
		});
	}

	/*   */

	render() {

		let movies = (
			<div className='movieFirstDiv'>
				{this.state.apiRes.results.map(( person, index ) => {
					return (
						<div className='moviemainView' key={person.id}>
							<img
								className='movieimage'
								src={'https://image.tmdb.org/t/p/w300' + person.profile_path}
								alt='Logo'
							/>
							<div className='movietextZone'>
								<div className='movieheaderZone'>
									<span className='movietitleText'>
										{person.name}
									</span>
									<span className='movievoteText'>
										{person.popularity}
									</span>
								</div>
								<div className='moviedescriptionZone'>
									<span className='moviedescriptionText'>
                                    <img 
                                            src={'https://image.tmdb.org/t/p/w300' + person.known_for[0].poster_path}
                                            alt='Logo' />
                                        <br />
                                        {person.known_for[0].overview}
									</span>
									{}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)

		return (
			<div className='ytci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='movieLogoPlaceholder'>
							<img src={TMDBLogo} alt='TMDB' className='ytciLogo'/>
						</div>
						<h2 className='youtubeChannelInfoTitle'>Actors :</h2>
						<div className='youtubeChannelClickers'>
							<WidgetClicker
									func={() => this.changePopupStateHandler()}
									src={EDITIcon}
									alt='Edit'
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
					{movies}
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
							<p>Search : </p>
							<input
								type='text'
								placeholder='Example : Chloë Grace Moretz'
								className='inputWidget'
								value={this.state.tmpNewTexte}
								onChange={(event) => this.texteChangeHandler(event)}/>
							<p>Refresh timer (in second): </p>
							<div className='trendsFlexDisplay'>
								<div className='trendsSubpart'>
									<p className='youtubeTrendsSubtitle'>Language : </p>
									<select value={this.state.tmpNewLanguage} onChange={(event) => this.languageChangeHandler(event)} className='selectTimer'>
										<option value='fr-FR'>French</option>
										<option value='en-GB'>English</option>
										<option value='es-ES'>Spanish</option>
										<option value='fr-CA'>Canadian</option>
										<option value='en-US'>U.S.A.</option>
									</select>
								</div>
								<div className='trendsSubpart'>
									<p className='youtubeTrendsSubtitle'>Timer : </p>
									<select value={this.state.tmpNewTimer} onChange={(event) => this.timerChangeHandler(event)} className='selectTimer'>
									<option value={10}>10</option>
									<option value={20}>20</option>
									<option value={30}>30</option>
									<option value={40}>40</option>
									<option value={50}>50</option>
									</select>
								</div>
							</div>
							<div className='buttonHolder'>
								<div className='darkGreenButton' onClick={() => {this.confirmChangesHandler()}}>
									Validate
								</div>
							</div>
						</div>
					</div> : null
				}
			</div>
		)
	}
}

export default MDBPeopleInfo