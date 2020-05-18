import { Machine } from 'xstate';
import { assert } from 'chai';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';

export const appMachine = Machine({
    initial: 'loggedOut',
    states: {
      loggedOut: {
        onEntry: ['error'],
        on: {
          SUBMIT: 'loading',
        },
        meta: {
          test: ({ getByTestId }) => {
            assert.ok(getByTestId('login-form') && !getByTestId('login-input').hasAttribute('disabled'));
          }
        }
      },
      loading: {
        on: {
          SUCCESS: 'loggedIn',
          FAIL: 'loggedOut',
        },
        meta: {
          test: ({ getByTestId }) => {
            assert.ok(!getByTestId('login-input').disabled);
          }
        }
      },
      loggedIn: {
        onEntry: ['setUser'],
        onExit: ['unsetUser'],
        on: {
          LOGOUT: 'loggedOut',
        },
        meta: {
          test: ({ getByTestId }) => {
            setTimeout(() => assert.ok(getByTestId('button-logout')), 2001);
          }
        }
      },
    },
  });