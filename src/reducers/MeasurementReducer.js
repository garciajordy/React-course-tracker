const MeasurementReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADDMEASUREMENT':
            return [...state, action.payload];
        case 'REMOVEMEASUREMENT':
            return [...state.filter(measure => parseInt(measure.id) !== parseInt(action.payload))]
        default:
            return state;
    }
}

export default MeasurementReducer;
