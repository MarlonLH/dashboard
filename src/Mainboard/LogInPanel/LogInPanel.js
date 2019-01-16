import React, { Component } from 'react'
import PanelHeader from '../PanelHeader/PanelHeader'
import SocialModule from '../../Logins/SocialModule'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

import './css/main.css'


export default class LogInPanel extends Component {

	constructor( props ) {
		super(props);
		this.state = {
		  username: "",
		  pass: "",
		  passC: "",
		  regi: false
		};
		this.loginInFunc = this.props.loginInFunc.bind(this)
	}

	notifysucc = (text) => {
		toast.success(text, {
		  autoClose: 3000
		});
	};

	notifyerr = (text) => {	  
		toast.error(text, {});
	};

	notifywarn = (text) => {
		toast.warn(text, {});
	};

	notifyinf = (text) => {
		toast.info(text, {});
	};

	cc() {
		var old = !this.state.regi
		this.setState({
			regi: old
		});
	}

	handleChange({ target }) {
		this.setState({
	  		[target.name]: target.value
		});
	}

	Connect() {
		this.notifysucc('Connection réussie');
		this.props.loginInFunc(this.state.username);
	}
	
	Register() {
		if (this.state.pass !== this.state.passC)
		{
			this.notifyerr('mots de passes différents');	
			return ;
		}
		let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})");
		if (!re.test(this.state.pass))
		{
			this.notifyerr('Mot de passe trop faible');
			setTimeout(() => {
				this.notifyinf('8 à 20 caractères Au moins une majuscule Au moins une minuscule Au moins un nombre');
			}, 3000);
			return ;
		}
		
		this.notifyinf('Votre compte a été crée');
		var old = !this.state.regi
		this.setState({
			pass: "",
			regi: old
		});
	}
	
	render() {
		return (
			<div>
				<PanelHeader
					name=''
					buttonOn={false}
				/>
				<div className="container-login100">
					<div className="wrap-login100 p-b-160 p-t-50">
						<form className="login100-form validate-form">
							<span className="login100-form-title p-b-43">
								Account Login
							</span>    
							
							{ this.state.regi ? (
								<div className="wrap-input101 rs3 validate-input" data-validate = "Username is required">
									<input className="input100 Myinput" type="text" name="username" value={ this.state.username } onChange={ this.handleChange.bind(this) }/>
									<span className={ this.state.username !== '' ? 'has-val label-input100' : 'label-input100' }>Username</span>
								</div>
							) : (
								<div className="wrap-input100 rs1 validate-input" data-validate = "Username is required">
									<input className="input100 Myinput" type="text" name="username" value={ this.state.username } onChange={ this.handleChange.bind(this) }/>
									<span className={ this.state.username !== '' ? 'has-val label-input100' : 'label-input100' }>Username</span>
								</div>
							) }

							{ this.state.regi ? (
								<div className="wrap-input100 rs0 validate-input" data-validate="Password is required">
									<input className="input100 Myinput" type="password" name="pass" value={ this.state.pass } onChange={ this.handleChange.bind(this) }/>
									<span className={ this.state.pass !== '' ? 'has-val label-input100' : 'label-input100' }>Password</span>
								</div>
							) : (
								<div className="wrap-input100 rs2 validate-input" data-validate="Password is required">
									<input className="input100 Myinput" type="password" name="pass" value={ this.state.pass } onChange={ this.handleChange.bind(this) }/>
									<span className={ this.state.pass !== '' ? 'has-val label-input100' : 'label-input100' }>Password</span>
								</div>
							) }

							{ this.state.regi ? (
					        		<div className="wrap-input100 validate-input" data-validate="Password is required">
									<input className="input100 Myinput" type="password" name="passC" value={ this.state.passC } onChange={ this.handleChange.bind(this) }/>
									<span className={ this.state.passC !== '' ? 'has-val label-input100' : 'label-input100' }>Password Check</span>
								</div>   

							) : ( <div></div>) }


							<div className="container-login100-form-btn">
								<button type="button" className="login100-form-btn"  onClick={ this.state.regi ? this.Register.bind(this) : this.Connect.bind(this) }>
									{ this.state.regi ?  "Register" : "Sign in" }
								</button>
							</div>
					
						<div className="text-center w-full p-t-23">
							<a className="txt1 link" onClick={ this.cc.bind(this) }>
								{ this.state.regi ?  "Sign in" : "Register" }
							</a>
							</div>
						</form>
					<SocialModule loginInFunc={this.loginInFunc}/>
					</div>
				</div>
				<ToastContainer autoClose={6000}
				pauseOnFocusLoss={false}
				closeOnClick= {true}
				pauseOnHover= {true}
				draggable= {true}
				position= "bottom-right"/>
			</div>	
		)
	}
};

// export default LogInPanel;
