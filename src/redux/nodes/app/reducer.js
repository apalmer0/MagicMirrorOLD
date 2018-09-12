import config from 'redux/nodes/app/config';

const { actionTypes } = config;
export const initialState = { session: {}, loading: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        session: { jwt: action.payload.jwt },
      };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        session: {},
        loading: false,
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_TWILIO_IMAGES:
      return {
        ...state,
        twilioImages: action.payload.data,
      };
    case actionTypes.FETCH_GOOGLE_IMAGES:
      return {
        ...state,
        googleImages: action.payload.data,
      };
    case actionTypes.FETCH_TODO_ITEMS:
      return {
        ...state,
        todo: action.payload.data,
      };
    case actionTypes.FETCH_WEATHER:
      return {
        ...state,
        weather: action.payload.data,
      };
    default:
      return state;
  }
};
