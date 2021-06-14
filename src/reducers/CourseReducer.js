const initialState = {
  name: '',
  id: '',
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        name: action.payload.name,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

export default CourseReducer;
