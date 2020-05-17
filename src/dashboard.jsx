import React from 'react';
import './App.css';
import { Auth } from './context';

export const Dashboard = () => (
    <Auth.Consumer>
      {({ user, logout }) => (
        <div className="welcome">
          <h1>Hello, {user.name}!</h1>
          <button
            className="bw0 br1 pa2 bg-green white pointer"
            onClick={e => logout(e)}
          >
            Logout
          </button>
        </div>
      )}
    </Auth.Consumer>
  );