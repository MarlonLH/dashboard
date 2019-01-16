import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar'
import Mainboard from './Mainboard/Mainboard'

import './App.css';

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			panelId: 2,
			isLogged: false,
			facebook: false,
			linkedin: false,
			github: false,
			google: false,
			token: ""
		}
		this._panelIdHandler = this._panelIdHandler.bind(this)
		this._loginInhandler = this._loginInhandler.bind(this)
	}

	componentDidMount() {
		var key = localStorage.getItem("Connect");
		if (!key)
			return ;
		var expire = new Date(key.split(";;")[1]);
		var current = new Date();
		if (current <= expire)
		{
			this.setState({
				isLogged: true,
				panelId: 0
			});
		}
		var tmp = key.split(";;").slice(2)[0]
		if (!tmp)
			return
		else if (tmp === "facebook")
			this.setState({facebook: true});
		else if (tmp === "github")
			this.setState({github: true});
		else if (tmp === "google")
			this.setState({google: true});
		else if (tmp === "linkedin")
			this.setState({linkedin: true});
		this.setState({token: key.split(";;").slice(3)[0]});
		console.log("sauce")
	}

	_panelIdHandler(id) {
		this.setState({ panelId: id })
	}

	_loginInhandler(account) {
		var old = !this.state.isLogged;
		this.setState({
			isLogged: old,
			panelId: old ? 0 : 2,
			account: account
		});
	}

	render() {
		return (
			<div className='myContainer'>
				<Sidebar
					changeId={this._panelIdHandler}
					isLoged={this.state.isLogged}
					selectedId={this.state.panelId}/>
				<Mainboard
					changeId={this._panelIdHandler}
					actualId={this.state.panelId}
					loginIn={this._loginInhandler}
					google={this.state.google}
					github={this.state.github}
					linkedin={this.state.linkedin}
					token={this.state.token}/>
			</div>
		)
	}
}

export default App;
