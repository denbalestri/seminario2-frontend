import { SET_READ_NOTIFICATIONS, ADD_NOTIFICATIONS } from './actionTypes.json';

export function readNotifications() {
  return { type: SET_READ_NOTIFICATIONS };
}

export function addNotifications(notifications) {
  return { type: ADD_NOTIFICATIONS, notifications };
}
