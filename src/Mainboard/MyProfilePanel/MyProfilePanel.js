import React, { Component } from 'react'
import PanelHeader from '../PanelHeader/PanelHeader'
import { Button, Collapse, CardBody, Card, CardImg, CardText,
	CardTitle, CardSubtitle, UncontrolledAlert } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.css';

import './MyProfilePanel.css'

class MyProfilePanel extends Component {
	
	constructor( props ) {
		super(props);
		this.state = {
			Toast: null,
			collapse: false,
			show: false,
			show2: false,
			name: localStorage.getItem("Connect"),
			profile: localStorage.getItem("pict"),
			p: "tmp",
			cc: "Tmp"
		};
		this.loginInFunc = this.props.loginInFunc.bind(this)
	}


	componentDidMount() {
	}

	handleShow() {
		var old = !this.state.show;
		this.setState({
			show: old
		});
	}

	handleShow2() {
		var old = !this.state.show2;
		this.setState({
			show2: old
		});
	}

	fader() {
		var old = !this.state.fade;
		this.setState({ 
			fade: old 
		});
	}

	toggle() {
		var old = !this.state.collapse;
		var old2 = !this.state.show;
		this.setState({ 
			collapse: old
		});
		if (this.state.show)
		{
			this.setState({ 
				show: old2
			});
		}
	}

	notifyinf = (text) => {
		toast.info(text, {});
	};

	logout() {
		this.notifyinf("Déconnecté")
		setTimeout(() => {
			this.props.loginInFunc();
		}, 2000);
	}

	Delete() {
		if (this.state.name === "")
		{
			this.notifyinf("Votre compte ne peut pas être supprimé via notre site")
			return ;
		}
		fetch('api/UserData/RemoveUser?name='
		+ this.state.name)
		this.Toast = toast('Suppression du compte ..', { autoClose: false });
		setTimeout(() => {
			toast.update(this.Toast, {
				render: 'Supprimé',
				type: toast.TYPE.INFO,
				autoClose: 2000,
				closeButton: null,
				className: css({
				  transform: "rotateY(360deg)",
				  transition: "transform 0.6s"
				})
			});
			setTimeout(() => {
				this.props.loginInFunc();
			}, 2000);
		}, 2000);
	}

	render() {

		return (
			<div>
				<div className='myProfilePanel' style={{ textAlign: 'center' }}>
					<PanelHeader
						name='My Profile'
						buttonOn={false} />
					<Button size="lg" color="warning" onClick={this.toggle.bind(this)} className="mButton">Manage</Button>
					<Button size="lg" color="info" onClick={this.handleShow2.bind(this)} className="mButton">Log out</Button>
					<UncontrolledAlert style={ { opacity: this.state.show2 ? '1' : '0' } } isOpen={this.state.show2} toggle={this.handleShow2.bind(this)} color="info">
        					<h4>Êtes-vous sûr ?</h4>
        				  	<p>
        						Vous risquerez de perdre vos widgets
						</p>
        					<p>
        						<Button color="info" onClick={this.logout.bind(this)}>Oui</Button>
							<span> or </span>
							<Button onClick={this.handleShow2.bind(this)}>Non</Button>
        					</p>
					</UncontrolledAlert>	
					<Collapse isOpen={this.state.collapse}>
						{ this.state.name !== "" ? (
							<Card>
        							<CardImg style={{ textAlign: "center", marginTop: "2rem" }}top width="10%" src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1" alt="Card image cap" />
								<CardBody>
									<CardTitle>Edit your Account</CardTitle>
									<CardSubtitle>Manage your account with our awesome API</CardSubtitle>
									<CardText>{ this.state.name }</CardText>
									<Button onClick={this.handleShow.bind(this)} color={ this.state.show ? "secondary" : "danger" }>Delete</Button>
									<UncontrolledAlert style={ { opacity: this.state.show ? '1' : '0' } } isOpen={this.state.show} toggle={this.handleShow.bind(this)} color="danger">
        									<h4>Êtes-vous sûr ?</h4>
        								  	<p>
        										Cette action est irréversible
        								  	</p>
        									<p>
        										<Button color="danger" onClick={this.Delete.bind(this)}>Oui</Button>
											<span> or </span>
											<Button onClick={this.handleShow.bind(this)}>Non</Button>
        									</p>
									</UncontrolledAlert>
								</CardBody>
							</Card>	) : (
							<Card>
							<CardImg style={{ textAlign: "center", marginTop: "2rem" }}top width="10%" src={this.state.p} alt="Card image cap" />
							<CardBody>
								<CardTitle>You've been logged in with an external tool</CardTitle>
								<CardSubtitle></CardSubtitle>
								<CardText>Unable to retrieve full data from : { this.state.cc }</CardText>
							</CardBody>
						</Card>
						)}
					</Collapse>
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
}

export default MyProfilePanel;