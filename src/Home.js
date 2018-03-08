import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to='/route1' label='route1'>Route 1</Link>
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