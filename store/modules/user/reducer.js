export default function user(state, action) {
  state = [];
  // console.log(action.user)
  switch (action.type) {
    case 'UPDATE_USER':
      return [action.user];

    default:
      return state;
  }

};
