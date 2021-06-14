const GET_DETAILS = 'GET_DETAILS';
const initialState = {
  coursedetail: [],
  loading: true,
};

const detailReducer = (state = initialState, action) => {
  if (action.type === GET_DETAILS) {
    return {
      coursedetail: action.detail,
      loading: false,
    };
  }
  return state;
};

export default detailReducer;
