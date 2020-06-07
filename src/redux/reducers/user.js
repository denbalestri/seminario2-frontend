import { SET_USER, LOGOUT_USER } from '../actions/actionTypes.json';

const initialState = {
  firstName: 'Santiago',
  lastName: 'Rico',
  username: 'srico',
  avatar: '../../../images/person5.jpg',
  rol: 'Autor',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, professionals: action.user };
    case LOGOUT_USER:
      return { initialState };
    default:
      return state;
  }
}
