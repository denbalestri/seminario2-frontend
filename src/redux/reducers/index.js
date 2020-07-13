import { combineReducers } from 'redux';

import user from './user';
import notifications from './notifications';
import professionals from './professionals';

export const reducers = combineReducers({
  user,
  professionals,
  notifications,
});
