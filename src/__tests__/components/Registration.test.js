import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Registration from '../../components/auth/Registration';
import store from '../../store/Store';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<Provider store={store}><Registration /></Provider>);
  expect(asFragment(<Provider store={store}><Registration /></Provider>)).toMatchSnapshot();
});

it('displays heading', () => {
  render(<Provider store={store}><Registration /></Provider>);
  expect(screen.getByText('Register')).toBeTruthy();
});
