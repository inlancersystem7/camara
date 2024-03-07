import { all, takeLeading } from "redux-saga/effects";
import * as types from '../actions/actionTypes'
import * as noteSaga from '../sagas/notesSaga'
import { editNotes } from "../sagas/notesSaga";

export default function* watch() {
  // yield all([takeLeading(ADD_NOTE, notesSaga.addNoteSaga)]);
  // yield all([
  //   watchNotes(),
  // ]);

  // yield all([takeLeading(types.ADD_NOTE,noteSaga.newNote)]);
  // yield all([takeLeading(types.GET_NOTE_LIST, noteSaga.noteDataList)]);
  // yield all([takeLeading(types.DELETE_NOTE, noteSaga.deleteNote)]);
  // yield all([takeLeading(types.EDIT_NOTE, noteSaga.editNotes)]);
}
