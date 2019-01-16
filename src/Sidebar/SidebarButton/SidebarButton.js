import React from 'react'
import './SidebarButton.css'

const SidebarButton = ( props ) => {

	let style = ''

	if (props.isClicked === props.id)
		style = 'buttonSidebarClicked'
	else
		style = 'buttonSidebar'

	return (
		<div className={style} onClick={props.click}>
			<img
				alt='logo'
				src={props.logo}
				className='imageSidebarbutton'/>
			<p className='pTagSidebarbutton'>
				{props.name}
			</p>
		</div>
	)
}

export default SidebarButton;