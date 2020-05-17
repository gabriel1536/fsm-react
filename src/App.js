import React from 'react';
import logo from './logo.svg';
import './App.css';
import { appMachine } from './machine';
import { Login } from './login';
import { Auth } from './context';
import { Dashboard } from './dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: appMachine.initialState.value,
      error: '',
      logout: e => this.logout(e),
      user: {},
    };
  }

  transition(event) {
    const currentState = this.state.authState;
    const nextAuthState = appMachine.transition(currentState, event.type);

    const nextState = nextAuthState.actions.reduce(
      (state, action) => this.command(action, event) || state,
      undefined,
    );

    this.setState({
      authState: nextAuthState.value,
      ...nextState,
    });
  }

  command(action, event) {
    switch (action.type) {
      case 'setUser':
        if (event.username) {
          return { user: { name: event.username }, error: '' };
        }
        break;
      case 'unsetUser':
        return {
          user: {},
        };
      case 'error':
        if (event.error) {
          return {
            error: event.error,
          };
        }
        break;
      default:
        break;
    }
  }

  logout(e) {
    e.preventDefault();
    this.transition({ type: 'LOGOUT' });
  }

  render() {
    const { authState, error } = this.state;

    return (
      <Auth.Provider value={this.state}>
        <div className="main">
          {authState === 'loggedIn' ? (
            <Dashboard />
          ) : (
            <Login transition={event => this.transition(event)} />
          )}
        </div>
      </Auth.Provider>
    );
  }
}

export default App;
