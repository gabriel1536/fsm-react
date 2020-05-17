import React from 'react';

export const Auth = React.createContext({
  authState: 'loggedOut',
  error: '',
  logout: () => { },
  user: {},
});