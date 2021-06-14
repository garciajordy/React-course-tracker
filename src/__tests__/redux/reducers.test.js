import { cleanup } from '@testing-library/react';
import store from '../../store/Store';

afterEach(cleanup);

it('should return initial state', () => {
  expect(store.getState().CourseReducer).toStrictEqual({ id: '', name: '' });
});

it('should return initial state', () => {
  expect(store.getState().MeasurementReducer).toStrictEqual([]);
});
