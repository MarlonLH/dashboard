import React from 'react'
import './PanelHeader.css'

const PanelHeader = ( props ) => {

	let button = null;
	let style = null;

	if (props.buttonOn === true) {
		style = props.setStyle;
		button = (
			<div className={style} onClick={props.onClickButton}>
				{props.buttonName}
			</div>
		)
	}

	return (
		<div className='headerPanel'>
			<div className='headerPanelTitle'>
				{props.name}
			</div>
			{button}
		</div>
	)
}

export default PanelHeader;