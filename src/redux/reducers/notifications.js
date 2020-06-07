import {
  ADD_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from '../actions/actionTypes.json';

const initialState = {
  notifications: [],
};

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return {
        notifications: [
          ...state.notifications,
          action.notifications.map(notification => ({
            ...notification,
            read: false,
          })),
        ],
      };
    case READ_NOTIFICATIONS:
      return {
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
      };
    default:
      return state;
  }
}
