/** @format */

import {
  SET_PROFESSIONALS,
  SET_PROFESSIONALSELECTED,
} from '../actions/actionTypes.json';

const initialState = {
  professionals: [],
  professionalSelected: [],
};

export default function professionals(state = initialState, action) {
  switch (action.type) {
    case SET_PROFESSIONALS:
      return { ...state, professionals: action.professionals };
    case SET_PROFESSIONALSELECTED:
      return { ...state, professionalSelected: action.professional };
    default:
      return state;
  }
}
