import React, { Component } from 'react'
import WidgetClicker from '../WidgetClicker/WidgetClicker'

import materialRedCross from './../../sources/materialRedCross.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

import './../WidgetBoardStyle.css'

class FluxRSSInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fluxRes:  this.props.res,
            popupOn: false,
            tmpNewFlux: '',
            tmpNewMax: 0,
            tmpNewTimer: this.props.resetTimer,
            seconds: 0
        }
        this.maxLink = this.props.maxLink
        this.title = this.props.title
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
        let Parser = require('rss-parser/dist/rss-parser.min.js')
        let parser = new Parser();
        let arr = [];
        let nbLink = 0;
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        parser.parseURL(CORS_PROXY + this.props.rssLink).then(res => {
            if (res.items && res.items[0]) {
                console.log(res.title)
                if (this.props.maxLink > res.items.length)
                    nbLink = res.items.length
                else
                    nbLink = this.props.maxLink
                for (let i = 0; i < nbLink; i++)
                    arr[i] = res.items[i];
            }
            console.log(arr)
            this.setState({ fluxRes: arr})
        });
        this.setState({
            tmpNewFlux: this.props.rssLink,
            tmpNewMax: this.props.maxLink,
        })
    }

    changePopupStateHandler() {
        this.setState({ popupOn: !this.state.popupOn })
    }

    fluxChangeHandler(event) {
        this.setState({tmpNewFlux: event.target.value})
        console.log(this.state.tmpNewFlux);
    }

    maxChangeHandler(event) {
        this.setState({tmpNewMax: event.target.value})
        console.log(this.state.tmpNewMax);
    }

    timerChangeHandler(event) {
        this.setState({tmpNewTimer: event.target.value})
        console.log(this.state.tmpNewTimer);
    }

    confirmChangesHandler() {
        let Parser = require('rss-parser/dist/rss-parser.min.js')
        let parser = new Parser();
        let arr = [];
        let nbLink = 0;
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        parser.parseURL(CORS_PROXY + this.state.tmpNewFlux).then(res => {
            if (res.items && res.items[0]) {
                console.log(res.title)
                if (this.state.tmpNewMax > res.items.length)
                    nbLink = res.items.length
                else
                    nbLink = this.state.tmpNewMax
                for (let i = 0; i < nbLink; i++)
                    arr[i] = res.items[i];
                console.log(arr)
                this.maxLink = this.state.tmpNewMax
                this.title = res.title
                this.setState({ fluxRes: arr})
                this.changePopupStateHandler()
            } else {
                alert('Wrong RSS Link')
            }
        })
    }

    render() {
        let allNews = (
            <div className='allNewsContainer'>
                {this.state.fluxRes.map((news, index) => {
                    return (
                        <div className='steamAppNewsContainer' key={news.pubDate}>
                            <div className='' dangerouslySetInnerHTML={{__html:news.content}}>
							</div>
                            <a target='_blank' href={news.link}>{news.title}</a>
                        </div>
                    )
                })}
            </div>
        )
        return (
            <div className='ytci'>
                <div className='infoPlaceholder'>
                    <div className='youtubeChannelTop'>
                        <div className='youtubeChannelInfoLogo'>
                        </div>
                        <h2 className='youtubeChannelInfoTitle'>{this.title}</h2>
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
                        {allNews}
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
							<p>RSS Link : </p>
							<input
								type='text'
								placeholder='Example : https://www.reddit.com/.rss'
								className='inputWidget'
								value={this.state.tmpNewFlux}
								onChange={(event) => this.fluxChangeHandler(event)}/>
                            <p>Number of Link : </p>
							<input
								type='number'
								placeholder='0'
								className='inputWidget'
								value={this.state.tmpNewMax}
								onChange={(event) => this.maxChangeHandler(event)}/>
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

export default FluxRSSInfo;