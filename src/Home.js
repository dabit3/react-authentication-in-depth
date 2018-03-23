import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import QRCode from 'qrcode.react'

class Home extends React.Component {
  state = {
    username: '',
    user: {},
    qrCode: '',
    challengeAnswer: ''
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => this.setState({ user }))
    Auth.currentUserInfo()
      .then(data => {
        this.setState({
          username: data.username
        })
      })
      .catch(err => console.log('error: ', err))
  }
  addTTOP = () => {
    Auth.setupTOTP(this.state.user).then((code) => {
      const authCode = "otpauth://totp/AWSCognito:"+ this.state.user.username + "?secret=" + code + "&issuer=AWSCognito";
      this.setState({ qrCode: authCode })
    });
  }
  setPreferredMFA = (authType) => {
    Auth.verifyTotpToken(this.state.user, this.state.challengeAnswer).then(() => {
      Auth.setPreferredMFA(this.state.user, authType)
        .then(data => console.log('data from verify...: ', data))
        .catch(err => console.log('error: ', err))
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome {this.state.username}</h1>
        <Link to='/route1' label='route1'>Route 1</Link><br /><br /><br />
        <button onClick={this.addTTOP} style={{ border: '1px solid #ddd', width: 125 }}>
          <p>Add TOTP</p>
        </button>
        {
          (this.state.qrCode !== '') && (
            <div>
              <br />
              <QRCode value={this.state.qrCode} />
            </div>
          )
        }
        <br /><br /><br />
        <button onClick={() => this.setPreferredMFA('TOTP')} style={{ border: '1px solid #ddd', width: 125 }}>
          <p>Prefer TOTP</p>
        </button>
        <br /><br />
        <button onClick={() => this.setPreferredMFA('SMS')} style={{ border: '1px solid #ddd', width: 125 }}>
          <p>Prefer SMS</p>
        </button>
        <br /><br /><br />
        <input placeholder='TOTP Code' onChange={e => this.setState({ challengeAnswer: e.target.value })} style={{ border: '1px solid #ddd', height: 35 }} />
       
      </div>
    )
  }
}

class Route1 extends React.Component {
  render() {
    return (
      <div>
        <h1>Route 1</h1>
        <p onClick={() => {
          Auth.signOut()
            .then(() => {
              this.props.history.push('/auth')
            })
            .catch(() => console.log('error signing out...'))
        }}>Sign Out</p>
      </div>
    )
  }
}

Home = withRouter(Home)
Route1 = withRouter(Route1)

export {
  Home,
  Route1
}