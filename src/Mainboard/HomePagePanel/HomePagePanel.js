import React, { Component } from 'react'

import YTLogo from './../sources/youtubeSquareWhite.png'
import STLogo from './../sources/steamWhiteLogo.png'
import NYTLogo from './../sources/newyorkTimes.png'
import LFMLogo from './../sources/lastfmlogo.png'
import EPLogo from './../sources/epitechLogo.png'
import TKLogo from './../sources/takerLogo.png'

import FakeWidgetSetup from './FakeWidget/FakeWidgetSetup'
import FakeWidgetInfo from './FakeWidget/FakeWidgetInfo'

import './HomePagePanel.css'

class HomePagePanel extends Component {
	firstPartButtonHandler() {
		this.props.changeId(3);
	}

	render() {
		return (
			<div className='HomePageStyle'>
				<div className='firstPart'>
					<h2 className='firstPartTitle'>Tired of having to search for every information you need ?</h2>
					<p className='firstPartSubTitles'>News, music, action value, weather, and everything you want.</p>
					<p className='firstPartSubTitles'>In only one screen !</p>
					<div className='firstPartButton' onClick={() => {this.firstPartButtonHandler()}}>
						Give it a try !
					</div>
					<p className='firstPartSubTitles'>Approved by our partners :</p>
					<div className='firstPartPartners'>
						<img src={YTLogo} className='firstPartPartnersLogo' alt='YOUTUBE'/>
						<img src={STLogo} className='firstPartPartnersLogo' alt='STEAM'/>
						<img src={NYTLogo} className='firstPartPartnersLogo' alt='NEWYORK TIMES'/>
						<img src={LFMLogo} className='firstPartPartnersLogo' alt='LASTFM'/>
						<img src={EPLogo} className='firstPartPartnersLogo' alt='EPITECH'/>
						<img src={TKLogo} className='firstPartPartnersLogo' alt='TAKER'/>
					</div>
				</div>
				<div className='secondPart'>
					<h2 className='secondPartTitle'>With BS Dashboard, create the dashboard you want.</h2>
					<p className='secondPartSubTitles'>Powered by Bullshit Industries, the BS Dashboard can help you organize your days.</p>
					<p className='secondPartSubTitles'>Generate the widgets you need, modify them as you wish, move them, or delete you don't want them anymore.</p>
					<p className='secondPartSubTitles'>All the widgets created refresh the information as often as you want.</p>
					<p className='secondPartSubTitles'>Easy to configure, you will earn hours of work in a bit of time.</p>
				</div>
				<div className='thirdPart'>
					<div className='thirdPartFirstMonitorPlaceholder'>
						<div className='thirdPartFirstMonitorImage'>
							<div className='firstPartButton'>
								Add a new widget
							</div>
						</div>
						<div className='thirdPartFirstMonitorText'>
							<p className='secondPartSubTitles'>With a simple button, you can access to a large choice of widget.</p>
							<p className='secondPartSubTitles'>You can either load the latest youtube trends.</p>
							<p className='secondPartSubTitles'>Or display your channel's information.</p>
							<p className='secondPartSubTitles'>Everything is up to you.</p>
						</div>
					</div>
					<div className='thirdPartSecondMonitorPlaceholder'>
						<div className='thirdPartSecondMonitorText'>
							<p className='secondPartSubTitles'>When the popup will turn on, you'll be amazed of all the things you can do.</p>
							<p className='secondPartSubTitles'>Each widget can be configured as you desire.</p>
							<p className='secondPartSubTitles'>You can choose who, where, what, it's up to you.</p>
							<p className='secondPartSubTitles'>Plus, you can choose how often you want the widget to refresh.</p>
						</div>
						<div className='thirdPartFirstMonitorImage'>
							<FakeWidgetSetup />
						</div>
					</div>
					<div className='thirdPartFirstMonitorPlaceholder'>
						<div className='thirdPartFirstMonitorImage'>
							<FakeWidgetInfo />
						</div>
						<div className='thirdPartFirstMonitorText'>
							<p className='secondPartSubTitles'>After you choose the widget you wanted, you will comeback to your dashboard.</p>
							<p className='secondPartSubTitles'>There, you will see all the widgets you created.</p>
							<p className='secondPartSubTitles'>You will be able to move them, modify them, and even delete them.</p>
							<p className='secondPartSubTitles'>The modification take effects imediatly.</p>
							<p className='secondPartSubTitles'>The widget keep the informations up to date thanks to the refresh timer.</p>
							<p className='secondPartSubTitles'>Now you know how to build the dashboard of your dream.</p>
						</div>
					</div>
					<div className='bigBlueButton' onClick={() => {this.firstPartButtonHandler()}}>
						Let's get started right now !
					</div>
				</div>
			</div>
		)
	}
}

export default HomePagePanel;