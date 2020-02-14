import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  uuid: null,
  cpf: null,
  name: null,
  signed: false,
  loading: false,
  permission: [],
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.uuid = action.payload.uuid;
        draft.cpf = action.payload.cpf;
        draft.name = action.payload.name;
        draft.permission = action.payload.permission;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.uuid = null;
        draft.cpf = null;
        draft.name = null;
        draft.loading = false;
        draft.signed = false;
        draft.permission = [];
        break;
      }
      default:
    }
  });
}
