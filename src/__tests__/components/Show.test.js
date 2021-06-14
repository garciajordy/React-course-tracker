import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Show from '../../components/Show';
import store from '../../store/Store';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Provider store={store}><Show /></Provider>
    </BrowserRouter>,
  );
  expect(asFragment(
    <BrowserRouter>
      <Provider store={store}><Show /></Provider>
    </BrowserRouter>,
  )).toMatchSnapshot();
});

it('displays heading', () => {
  render(
    <BrowserRouter>
      <Provider store={store}><Show /></Provider>
    </BrowserRouter>,
  );
  expect(screen.getByText('Today')).toBeTruthy();
});
