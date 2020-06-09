import {
  ADD_NOTIFICATIONS,
  SET_READ_NOTIFICATIONS,
  SET_NOTIFICATION,
} from '../actions/actionTypes.json';

const initialState = {
  notifications: [],
  read: false,
  notification: [],
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return { ...state, notifications: action.notifications, read: false };
    case SET_READ_NOTIFICATIONS:
      return { ...state, read: true };
    case SET_NOTIFICATION:
      return { ...state, notification: action.notification };
    default:
      return state;
  }
}
