const actionTypes = {
  FETCH_GOOGLE_IMAGES: 'FETCH_GOOGLE_IMAGES',
  FETCH_TODO_ITEMS: 'FETCH_TODO_ITEMS',
  FETCH_TRIVIA_ITEMS: 'FETCH_TRIVIA_ITEMS',
  FETCH_WEATHER: 'FETCH_WEATHER',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

const hostname = process.env.NODE_ENV === 'production' ? 'https://magic-mirror-api.herokuapp.com' : 'http://localhost:3000';

export default {
  actionTypes,
  hostname,
};
