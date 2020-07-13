/** @format */

import {
  SET_PROFESSIONALS,
  SET_PROFESSIONALSELECTED,
} from './actionTypes.json';

export function setProfessionals(professionals) {
  return { type: SET_PROFESSIONALS, professionals };
}

export function setProfessionalSelected(professional) {
  return { type: SET_PROFESSIONALSELECTED, professional };
}
