const MeasurementReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADDMEASUREMENT':
      return [...state, action.payload];
    case 'REMOVEMEASUREMENT':
      return [...state.filter((measure) => parseInt(measure.id, 10)
        !== parseInt(action.payload, 10))];
    default:
      return state;
  }
};

export default MeasurementReducer;
