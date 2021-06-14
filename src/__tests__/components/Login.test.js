import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Login from '../../components/auth/Login';
import store from '../../store/Store';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<Provider store={store}><Login /></Provider>);
  expect(asFragment(<Provider store={store}><Login /></Provider>)).toMatchSnapshot();
});

it('displays heading', () => {
  render(<Provider store={store}><Login /></Provider>);
  expect(screen.getByText('Login')).toBeTruthy();
});
