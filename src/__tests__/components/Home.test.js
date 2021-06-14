import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../../components/Home';
import store from '../../store/Store';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<Provider store={store}><Home /></Provider>);
  expect(asFragment(<Provider store={store}><Home /></Provider>)).toMatchSnapshot();
});

it('displays heading', () => {
  render(<Provider store={store}><Home /></Provider>);
  expect(screen.getByText('Home')).toBeTruthy();
});
