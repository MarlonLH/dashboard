import React, { Component } from 'react'
import FluxRSSIcon from './../../sources/FluxRSSIcon.png'
import FluxRSSInfo from '../../Widgets/FluxRSSInfo/FluxRSSInfo'

import './../WidgetStyle.css'

class FluxRSS extends Component {
    state = {
        rssLink: '',
        maxLink: 1,
        timer: 10
    }

    rssLinkChangeHandler(event) {
        this.setState({ rssLink: event.target.value })
    }

    maxLinkChangeHandler(event) {
        this.setState({ maxLink: event.target.value })
    }

    selectChangeHandler = (event) => {
        this.setState({ timer: event.target.value })
    }

    createWidget = () => {
        let Parser = require('rss-parser/dist/rss-parser.min.js')
        let parser = new Parser();
        let arr = [];
        let nbLink = 0;
        const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
        parser.parseURL(CORS_PROXY + this.state.rssLink).then(res => {
            if (res.items && res.items[0]) {
                if (this.state.maxLink > res.items.length)
                    nbLink = res.items.length
                else
                    nbLink = this.state.maxLink
                for (let i = 0; i < nbLink; i++)
                    arr[i] = res.items[i];
                let widget = (
                    <FluxRSSInfo
                        rssLink={this.state.rssLink}
                        maxLink={nbLink}
                        resetTimer={this.state.timer}
                        deleteWidget={this.props.deleteWidget.bind(this)}
                        moveWidget={this.props.movewidget.bind(this)}
                        key={this.props.widgetNumber}
                        datakey={this.props.widgetNumber}
                        title={res.title}
                        res={arr} />
                )
				this.props.widgetCode(widget)
            } else {
                alert('Wrong RSS Link')
            }
        })
    }

    render() {
        return (
            <div className='widgetBox'>
                <div className='WhiteLogoPlaceholder'>
                    <img src={FluxRSSIcon} alt='RSS' className='logoWidget'/>
                </div>
                <div className='infoPlaceholder'>
                    <div className='topPart'>
                        <p className='titleStyle'>RSS Info : </p>
                        <div className='widgetTooltip'>i
                            <span className='widgetTooltiptext'>Show the main information about the weather of the city you want</span>
                        </div>
                    </div>
                    <p className='widgetSubtitle'>RSS Link : </p>
                    <input
                        type='text'
                        placeholder='Example : https://www.reddit.com/.rss'
                        className='inputWidget'
                        value={this.state.rssLink}
                        onChange={(event) => this.rssLinkChangeHandler(event)}/>
                    <p className='widgetSubtitle'>Number of Link : </p>
                    <input
                        type='text'
                        placeholder='0'
                        className='inputWidget'
                        value={this.state.maxLink}
                        onChange={(event) => this.maxLinkChangeHandler(event)}/>
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

export default FluxRSS;