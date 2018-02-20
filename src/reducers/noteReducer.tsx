import {ADD_NOTE, UPDATE_NOTE} from '../constants/actionTypes';
import initialState from './initialState';

//note the mapping of the initial state property here
export default function noteReducer(state = initialState.note, action: any) {
  let newState:any = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_NOTE:
      newState[action.field] = action.value;
      return newState;
    case ADD_NOTE:
      newState.noteList.push(action.note);
      return newState;
    default:
      return state;
  }
}

