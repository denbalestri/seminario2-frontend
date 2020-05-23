/** @format */

import { SET_USER } from '../actions/actionTypes.json';

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
      return action.user;

    default:
      return state;
  }
}
