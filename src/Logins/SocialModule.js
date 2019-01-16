import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import SocialButton from './SocialButton'
import UserCard from './UserCard'

export default class SocialModule extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  notifysucc = (text) => {
    toast.success(text, {
      autoClose: 3000
    });
  };

  notifyerr = (text) => {
    toast.error(text, {});
  };


  setNodeRef (provider, node) {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLoginSuccess (user) {

    this.setState({
      logged: true,
      currentProvider: user._provider,
      user
    })
    var tmp = new Date();
    tmp.setHours(tmp.getHours() + 2);
    var time = tmp.toString();
    localStorage.setItem("Connect", ';;' + time + ';;' + user._provider + ';;' + localStorage.getItem('token'));
    localStorage.removeItem('token')
    this.notifysucc('Connection réussie');
    setTimeout(() => {
      this.props.loginInFunc();
    }, 1500);

  }

  onLoginFailure (err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess () {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })

  }

  onLogoutFailure (err) {
    console.error(err)
  }

  logout () {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render () {
    let children

    if (this.state.logged) {
      children = 
      <div>
        <UserCard user={this.state.user} logout={this.logout} />
				<ToastContainer autoClose={6000}
			  pauseOnFocusLoss={false}
			  closeOnClick= {true}
			  pauseOnHover= {true}
        draggable= {true}
        position= "bottom-right"/>
      </div>
    } else {
      children = [
        <div>
          <SocialButton
            provider='facebook'
            appId='1762006153925332'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'facebook')}
            key={'facebook'}
          >
            Login Facebook
          </SocialButton>,
          <SocialButton
            provider='google'
            appId='509279354277-8526nnaq6r8f59bba8d69b43o1ul5k6p.apps.googleusercontent.com'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            onLogoutFailure={this.onLogoutFailure}
            getInstance={this.setNodeRef.bind(this, 'google')}
            key={'google'}
          >
            Login Google
          </SocialButton>,
          <SocialButton
            provider='linkedin'
            appId='77kx0vk5k9jqo7'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'linkedin')}
            key={'linkedin'}
          >
            Login LinkedIn
          </SocialButton>,
          <SocialButton
            autoCleanUri
            provider='github'
            gatekeeper='http://localhost:8080'
            appId='76860fcda207e46aa5f4'
            redirect='http://localhost:8080'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'github')}
            key={'github'}
          >
            Login GitHub OAuth
          </SocialButton>
				  <ToastContainer autoClose={6000}
				  pauseOnFocusLoss={false}
				  closeOnClick= {true}
				  pauseOnHover= {true}
				  draggable= {true}
				  position= "bottom-right"/>
         </div>
      ]
    }

    return children
  }
}