import API from 'api';
import axios from 'axios';
import config from 'redux/nodes/app/config';

const { actionTypes, hostname } = config;

const loginRequest = { type: actionTypes.LOGIN_REQUEST };
const loginFailure = { type: actionTypes.LOGIN_FAILURE };
const loginSuccess = (jwt) => {
  return { type: actionTypes.LOGIN_SUCCESS, payload: { jwt } };
};

const logoutRequest = { type: actionTypes.LOGOUT_REQUEST };
const logoutFailure = { type: actionTypes.LOGOUT_FAILURE };
const logoutSuccess = { type: actionTypes.LOGOUT_FAILURE };

const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(loginRequest);

    return API.sessions.create({ email, password })
      .then(({ jwt }) => dispatch(loginSuccess(jwt)))
      .catch(() => dispatch(loginFailure));
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch(logoutRequest);

    return API.sessions.destroy()
      .then(() => dispatch(logoutSuccess))
      .catch(() => dispatch(logoutFailure));
  };
};

const fetchWeather = () => {
  return (dispatch) => {
    const ZIPCODE = '02141';
    const { WEATHER_API_KEY } = process.env;
    const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${WEATHER_API_KEY}`;
    const url = `${ROOT_URL}&zip=${ZIPCODE},us`;
    const request = axios.get(url);

    request.then((response) => {
      dispatch({
        type: actionTypes.FETCH_WEATHER,
        payload: response,
      });
    });
  };
};

const fetchTodoItems = () => {
  return (dispatch) => {
    const ROOT_URL = `${hostname}/api/items?due=today&status=incomplete`;
    const request = axios.get(ROOT_URL);

    request.then((response) => {
      dispatch({
        type: actionTypes.FETCH_TODO_ITEMS,
        payload: response,
      });
    });
  };
};

export default { fetchTodoItems, fetchWeather, login, logout };
