import { SET_READ_NOTIFICATION, ADD_NOTIFICATIONS } from './actionTypes.json';

export function readNotifications() {
  return { type: SET_READ_NOTIFICATION };
}

export function addNotifications(notifications) {
  return { type: ADD_NOTIFICATIONS, notifications };
}
