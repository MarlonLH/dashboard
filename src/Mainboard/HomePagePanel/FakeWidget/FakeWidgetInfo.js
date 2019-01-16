import React, { Component } from 'react'
import { FetchData } from '../../../Api/ApiFetcher';

import materialRedCross from './../../sources/materialRedCross.png'
import UPIcon from './../../sources/upSign.png'
import DOWNIcon from './../../sources/downSign.png'
import EDITIcon from './../../sources/editPen.png'

class FakeWidgetInfo extends Component {
	constructor ( props ) {
		super(props);
		this.state = {
			apiRes: {
				snippet: {
					title: 'ZeratoRSC2',
					description: 'loading',
					thumbnails: {
						medium: {
							url: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi-8I_HqYzeAhUGThoKHR_rCpcQjRx6BAgBEAU&url=https%3A%2F%2Fidgenomics.com%2Fhome%2Ffacebook_no_photo_26-8%2F&psig=AOvVaw0XrwdNyf7Wtq1zSxaI4O1n&ust=1539826129810315'
						}
					}
				},
				statistics: {
					subscriberCount: 0,
					viewCount: 0
				}
			}
		}
		this.resetTimer = this.props.resetTimer
		this.keyId = 'AIzaSyAc5WiG1YX5lhz7DVUZuVy12ZHyhf_raS4'
		this.urlPart = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername='
		this.apiUrl = this.urlPart + 'zeratorsc2&key=' + this.keyId
	}

	componentWillMount() {
		FetchData(this.apiUrl).then(res => {
			this.setState({ apiRes: res.items[0] })
		});
	}

	render() {
		return (
			<div className='fakeYtci'>
				<div className='infoPlaceholder'>
					<div className='youtubeChannelTop'>
						<div className='youtubeChannelInfoLogo'>
							<img src={this.state.apiRes.snippet.thumbnails.medium.url} alt='Avatar' className='youtubeChannelLogo' />
						</div>
						<h2 className='youtubeChannelInfoTitle'>{this.state.apiRes.snippet.title}</h2>
						<div className='youtubeChannelClickers'>
							<img
									src={EDITIcon}
									alt='Edit'
									className='redCross'/>
							<img
									src={UPIcon}
									alt='UP'
									className='redCross'/>
							<img
									src={DOWNIcon}
									alt='DOWN'
									className='redCross'/>
							<img
									src={materialRedCross}
									alt='X'
									className='redCross'/>
						</div>
					</div>
					<div className='firstLine'>
						<div className='youtubeChannelDescription'>
							<span>{this.state.apiRes.snippet.description}</span>
						</div>
					</div>
					<div className='secondaryInformation'>
						<p><span>Subscribers : </span>{this.state.apiRes.statistics.subscriberCount}</p>
						<p><span>Views : </span>{this.state.apiRes.statistics.viewCount}</p>
					</div>
				</div>
			</div>
		)
	}
}

export default FakeWidgetInfo;