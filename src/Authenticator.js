import React from 'react'
import { css } from 'glamor'
import { withRouter } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Authenticator extends React.Component {
  state = {
    showSignIn: true
  }
  switchState = (showSignIn) => {
    this.setState({
      showSignIn
    })
  }
  render() {
    const { showSignIn } = this.state
    return (
      <div>
        {
          showSignIn ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        }
        <div {...css(styles.buttonContainer)}>
          <p
            {...css(styles.button, showSignIn && styles.underline)}
            onClick={() => this.switchState(true)}
          >Sign In</p>
          <p
            onClick={() => this.switchState(false)}
            {...css(styles.button, !showSignIn && styles.underline)}
          >Sign Up</p>
        </div>
      </div>
    )
  }
}

export default withRouter(Authenticator)

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    width: '100px',
    paddingBottom: '10px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent'
  },
  underline: {
    borderBottomColor: '#ddd'
  }
}