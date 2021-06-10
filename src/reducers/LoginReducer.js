const initialState = {
    user: {},
    login: false,
}

const LogIn = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload,
                login: true
            };
        case "LOGOUT":
            return {
                ...state,
                user: {},
                login: false
            }
        default:
            return state;
    }
}

export default LogIn;
