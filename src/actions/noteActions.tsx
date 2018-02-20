import * as types from '../constants/actionTypes';
import {TestService} from '../services'

export function handleUpdate(field: string, value: string) {
  return {
      type: types.UPDATE_NOTE,
      field,
      value
  };
}

export function addNote(note: string) {
    return {
        type: types.ADD_NOTE,
        note
    };
}