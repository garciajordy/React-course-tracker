import detailReducer from '../../reducers/DetailsReducer';

describe('Detail Reducer', () => {
  it('1. Checks the default state is returned', () => {
    const mockState = undefined;
    const mockAction = { type: 'any' };
    const mockFetching = false;
    const state = detailReducer(mockState, mockAction, mockFetching);
    expect(state).toStrictEqual({
      coursedetail: [],
      loading: true,
    });
  });

  it(
    '2. Checks the default action for the reducer, should return given state',
    () => {
      const mockState = {
        coursedetail: [],
        active: 'Some Active details',
      };
      const mockAction = { type: 'any' };
      const state = detailReducer(mockState, mockAction);
      expect(state).toStrictEqual({
        coursedetail: [],
        active: 'Some Active details',
      });
    },
  );
});
