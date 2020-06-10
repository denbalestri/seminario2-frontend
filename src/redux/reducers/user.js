import { SET_USER, LOGOUT_USER } from '../actions/actionTypes.json';

const initialState = {
  user: {
    rol: 'Autor',
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case LOGOUT_USER:
      return { initialState };
    default:
      return state;
  }
}
