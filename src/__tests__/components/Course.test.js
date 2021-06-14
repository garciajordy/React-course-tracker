import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Course from '../../components/Course';
import store from '../../store/Store';

afterEach(cleanup);

function test() {
  return true;
}
const courseName = 'Ruby';
const courseId = 5;
it('should take a snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Course handleClick={test} courseName={courseName} courseId={courseId} />
      </Provider>
    </BrowserRouter>,
  );
  expect(asFragment(
    <Provider store={store}>
      <Course handleClick={test} courseName={courseName} courseId={courseId} />
    </Provider>,
  )).toMatchSnapshot();
});

it('displays heading', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Course handleClick={test} courseName={courseName} courseId={courseId} />
      </Provider>
    </BrowserRouter>,
  );
  expect(screen.getByText('Ruby')).toBeTruthy();
});
