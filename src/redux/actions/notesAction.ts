import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE, GET_NOTE_LIST_FAILED } from "./actionTypes";
import * as types from '../actions/actionTypes'
interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: string;
}

interface DeleteNoteAction {
  type: typeof DELETE_NOTE;
  payload: string;
}

export type NoteActionTypes = AddNoteAction | DeleteNoteAction;

export function addNote  (data:any) {
  return {
    type: types.ADD_NOTE,
    data
  };
};

export function editNote  (id:string , data:any) {
  console.log('iddForAdd',id);
  console.log('dataForAdd',data);
  return {
    type: types.EDIT_NOTE,
    id,
    data
  };
};

export function getNoteList(response) {
  return {
    type: types.GET_NOTE_LIST,
    response,
  };
}

export function requestNotesFailed() {
  return {
    type: types.GET_NOTE_LIST_FAILED,
  };
}

export const deleteNote = (id: string) => {
  return {
    type: DELETE_NOTE,
    id,
  };
};

export function deleteSuccess() {
  return {
    type: types.DELETE_SUCCESS,
  };
}
