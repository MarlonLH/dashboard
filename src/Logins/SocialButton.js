import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SocialLogin from 'react-social-login'

class Button extends Component {
  static propTypes = {
    triggerLogin: PropTypes.func.isRequired,
    triggerLogout: PropTypes.func.isRequired
  }

  render () {
    const { children, triggerLogin, triggerLogout, ...props } = this.props
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    return (
      <div onClick={triggerLogin} style={style} {...props}>
        { children }
      </div>
    )
  }
}

export default SocialLogin(Button)

// ---- UTILISATION :
//
//import SocialButton from '../Logins/SocialButton'
//
//<div>
//  <SocialButton
//    provider='amazon'
//    appId='amzn1.application-oa2-client.1ca2f68ac4354fd2867d43a50ccde296'
//    onLoginSuccess={(res) => console.log('OK: ', res)}
//    onLoginFailure={(err) => console.log('erreur: ', err)}
//    >
//    Login with Facebook
//  </SocialButton>
//</div>
//
//
// ----- providers : appId
// amazon : amzn1.application-oa2-client.1ca2f68ac4354fd2867d43a50ccde296
// facebook : 1762006153925332
// github : 49e0c773a9ea6d896557
// google : 509279354277-h3gt84a5k7qhkag7mf8tg1ut2uvp2pok.apps.googleusercontent.com
// instagram : 1a2ad6e38cbf43a587f1d44d884dbde2
// linkedin : 77kx0vk5k9jqo7