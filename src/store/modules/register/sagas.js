import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;

    const response = yield call(api.post, 'Autenticador/AutenticarUsuarioApp', {
      login,
      senha: password,
    });

    const name = response.data[0].Usuario[1].Nome_usr;
    const { token } = response.data[0].Usuario[1];

    api.defaults.headers.Authorization = token;

    yield put(signInSuccess(token, name, login));
  } catch (err) {
    Alert.alert('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = token;
  }
}

export function signOut() {}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
