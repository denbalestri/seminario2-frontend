import {
  ADD_NOTIFICATIONS,
  SET_READ_NOTIFICATIONS,
} from '../actions/actionTypes.json';

const initialState = [];

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return [
        ...state,
        action.notifications.map(notification => ({
          ...notification,
          read: false,
        })),
      ];
    case SET_READ_NOTIFICATIONS:
      return state.map(notification => ({
        ...notification,
        read: true,
      }));
    default:
      return state;
  }
}
