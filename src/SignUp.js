import React from 'react'
import { css } from 'glamor'
import { withRouter } from 'react-router-dom'

import { Auth } from 'aws-amplify'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
    showConfirmation: false
  }
  onChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  signUp = () => {
    const { username, password, email, phone_number } = this.state
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number
      }
    })
    .then(() => this.setState({ showConfirmation: true }))
    .catch(err => console.log('error signing up: ', err))
  }
  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.username, this.state.authCode)
    .then(() => this.props.history.push('/'))
    .catch(err => console.log('error confirming signing up: ', err))
  }
  render() {
    const { showConfirmation } = this.state
    return (
      <div {...css(styles.container)}>
        {
          !showConfirmation && (
            <div {...css(styles.container)}>
              <input
                {...css(styles.input)}
                placeholder='Username'
                onChange={evt => this.onChange('username', evt.target.value)}
              />
              <input
                {...css(styles.input)}
                placeholder='Password'
                type='password'
                onChange={evt => this.onChange('password', evt.target.value)}
              />
              <input
                {...css(styles.input)}
                placeholder='Email'
                onChange={evt => this.onChange('email', evt.target.value)}
              />
              <input
                {...css(styles.input)}
                placeholder='Phone Number'
                onChange={evt => this.onChange('phone_number', evt.target.value)}
              />
              <div {...css(styles.button)} onClick={this.signUp}>
                <p {...css(styles.buttonText)}>Sign Up</p>
              </div>
            </div>
          )
        }
        {
          showConfirmation && (
            <div>
              <input
                onChange={evt => this.onChange('authCode', evt.target.value)}
                {...css(styles.input)}
                placeholder='Confirmation Code'
              />
              <div {...css(styles.button)} onClick={this.confirmSignUp}>
                <p {...css(styles.buttonText)}>Confirm Sign Up</p>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  button: {
    padding: '10px 60px',
    backgroundColor: '#ddd',
    cursor: 'pointer',
    borderRadius: '3px',
    ':hover': {
      backgroundColor: '#ededed'
    }
  },
  buttonText: {
    margin: 0
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '15px'
  },
  input: {
    height: 40,
    marginBottom: '10px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid #4CAF50',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, .3)'
    }
  },
}

export default withRouter(SignUp)
