import API from 'api';
import axios from 'axios';
import config from 'redux/nodes/app/config';
import constants from 'constants';

const { actionTypes } = config;

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
    const CAMBRIDGE = 'Cambridge';
    const WEATHER_API_KEY = '3122f191c21ed2ebad4ab7fde0f8636a';
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast/daily/?appid=${WEATHER_API_KEY}`;
    const city = CAMBRIDGE;
    const count = '7';
    const url = `${ROOT_URL}&q=${city},us&cnt=${count}`;
    const request = axios.get(url);

    request.then((response) => {
      dispatch({
        type: actionTypes.FETCH_WEATHER,
        payload: response,
      });
    });
  };
};

export default { fetchWeather, login, logout };
