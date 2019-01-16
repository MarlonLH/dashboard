import React, { Component } from 'react'
import materialRedCross from '../sources/materialRedCross.png'

import YTChannel from './YTChannel/YTChannel'
import YTTrends from './YTTrends/YTTrends'
import STPlayerStats from './STPlayerStats/STPlayerStats'
import Weather from './Weather/Weather'
import STAppNews from './STAppNews/STAppNews'
import MDBSearch from './MDBSearch/MDBSearch'
import TDValue from './TDValue/TDValue'
import FluxRSS from './FluxRSS/FluxRSS'
import STGameAchi from './STGameAchi/STGameAchi'
import LFMAlbum from './LFMAlbum/LFMAlbum'
import NYTSearch from './NYTSearch/NYTSearch'
import TDNews from './TDNews/TDNews'
import MDBTV from './MDBTV/MDBTV'
import MDBPeople from './MDBPeople/MDBPeople'
import LFMSearchAlbum from './LFMSearchAlbum/LFMSearchAlbum'
import LFMArtist from './LFMArtist/LFMArtist'
import LFMTracks from './LFMTracks/LFMTracks'
import LFMSearchArtist from './LFMSearchArtist/LFMSearchArtist'
import LFMSearchTrack from './LFMSearchTrack/LFMSearchTrack'
import GHUser from './GHUser/GHUser'

import './WidgetPopup.css'

class WidgetPopup extends Component {
	state = {
	}

	widgetParam(code) {
		this.props.addWidget(code);
		this.props.closePopup();
	}

	render() {
		return (
			<div className='popup'>
				<div className='popup_inner'>
					<div align='right' className='popupHeader'>
						<div className='popupClose'>
							<img
								onClick={this.props.closePopup}
								src={materialRedCross}
								alt='X'
								className='popupCross'/>
						</div>
					</div>
					<div className='widgetPlaceholder'>
						<YTChannel widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<YTTrends widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<GHUser widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<STPlayerStats widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<STAppNews widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<STGameAchi widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<Weather widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<TDValue widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<FluxRSS widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<NYTSearch widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<TDNews widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<MDBSearch widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<MDBTV widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<MDBPeople widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<LFMSearchAlbum widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<LFMSearchArtist widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<LFMSearchTrack widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<LFMAlbum widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<LFMArtist widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
						<LFMTracks widgetCode={this.widgetParam.bind(this)} widgetNumber={this.props.widgetNumber} deleteWidget={this.props.deleteWidget.bind(this)} movewidget={this.props.moveWidget.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}

export default WidgetPopup