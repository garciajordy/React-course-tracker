import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Dashboard from '../../components/Dashboard';
import store from '../../store/Store';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<Provider store={store}><Dashboard /></Provider>);
  expect(asFragment(<Provider store={store}><Dashboard /></Provider>)).toMatchSnapshot();
});

it('displays heading', () => {
  render(<Provider store={store}><Dashboard /></Provider>);
  expect(screen.getByText('Dashboard')).toBeTruthy();
});
