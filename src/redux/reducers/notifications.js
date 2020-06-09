import {
  ADD_NOTIFICATIONS,
  SET_READ_NOTIFICATIONS,
} from '../actions/actionTypes.json';

const initialState = {
  notifications: [],
  read: false,
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return { ...state, notifications: action.notifications, read: false };
    case SET_READ_NOTIFICATIONS:
      return { ...state, read: true };
    default:
      return state;
  }
}
