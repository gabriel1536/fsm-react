import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from './context';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yourName: '',
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({
      yourName: e.target.value,
    });
  }

  /**
   * This is where your authentication logic would go. For the purposes
   * of this demo, we're just faking an async request with a setTimeout
   */
  doLogin(e) {
    e.preventDefault();

    this.props.transition({ type: 'SUBMIT' });

    setTimeout(() => {
      if (this.state.yourName) {
        return this.props.transition({
          type: 'SUCCESS',
          username: this.state.yourName,
        }, () => {
          this.setState({ yourName: '' });
        });
      }

      return this.props.transition({
        type: 'FAIL',
        error: 'Uh oh, you must enter your name!',
      });
    }, 0);
  }
 
  render() {
    return (
      <Auth.Consumer>
        {({ authState, error }) => {
          const errorClass = error ? 'error' : '';
          return (
            <form onSubmit={e => this.doLogin(e)} className="login-form" data-testid="login-form">
              <h2>Login to your account</h2>
              <div className="error-message">{error}</div>
              <label htmlFor="yourName">
                <input
                  id="yourName"
                  name="yourName"
                  type="text"
                  autoComplete="off"
                  placeholder="Your name"
                  className={errorClass}
                  value={this.state.yourName}
                  onChange={this.handleInput}
                />
              </label>
              <input
                type="submit"
                data-testid="login-input"
                value={authState === 'loading' ? 'Logging in...' : 'Login'}
                disabled={authState === 'loading' ? true : false}
              />
            </form>
          )
        }}
      </Auth.Consumer>
    );
  }
}