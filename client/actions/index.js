import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';
export const UPDATE_POST = 'update_post';

export function signin(username, password) {
  return async dispatch => {
    try {
      // 주의!: OAuth2Server는 x-www-form-urlencoded 만 받는다.
      const response = await axios.post(`${Config.server}/api/oauth/token`,
        qs.stringify({
          username: username,
          password: password,
          client_secret: Config.clientSecret,
          client_id: Config.clientId,
          grant_type: 'password'
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      console.log("RESULT", response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      console.log(`Bearer ${response.data.access_token}`);
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      NavigationService.navigate('App');
    } catch (err) {
      console.log(err.response || err);
      alert('Invalid ID or Password');
    }
  };
}

export function signout() {
  console.log("SIGNOUT!!");
  return async dispatch => {
    console.log("DELETE authorization header!");
    delete axios.defaults.headers.common['Authorization'];
    await AsyncStorage.clear();
    NavigationService.navigate('Auth');
  };
}

export function fetchUsers() {
  return dispatch => {
    console.log(axios.defaults.headers.common);
    axios.get(`${Config.server}/api/users`).then( response => {
      dispatch({type: 'FETCHED_USERS', payload: response.data});
    }).catch(err => {
      console.log(err.response);
      if (err.response.status == 401) {
        dispatch(signout());
      } else {
        alert('Network Error');
      }
    });
  };
}

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: axios.get('/api/posts/')
  };
}

export function fetchPost(id) {
  return {
    type: FETCH_POST,
    payload: axios.get(`/api/posts/${id}`)
  };
}

export function updatePost(id, values, callback) {
  return {
    type: UPDATE_POST,
    payload: axios.put(`/api/posts/${id}`, values).then(() => callback())
  };
}

export function createPost(values, callback) {
  const request = axios.post('/api/posts', values).then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`/api/posts/${id}`).then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  }
}



