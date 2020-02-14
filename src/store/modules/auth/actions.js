export function signInRequest(login, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { login, password },
  };
}

export function signInSuccess(token, name, cpf, uuid, permission) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, name, cpf, uuid, permission },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
