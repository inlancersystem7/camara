// src/redux/sagas/notesSaga.ts
import { call, put } from "redux-saga/effects";
import * as noteAction from '../actions/notesAction';
import { showMessage } from "react-native-flash-message";

export function * newNote(action){
  const {
    data
  } =action

  yield call(noteDataList);
}

export function * noteDataList(action) {
  const response = yield call(dbNotes.getNotesData);
  if (response) {
    console.log('RESPONSE_CLINICIAN_LIST', response);
    yield put(noteAction.getNoteList(response));
    if (action?.resolve) {
      action?.resolve(response);
    }
  } else {
    yield put(noteAction.requestNotesFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}

export function * deleteNote(action){
  const response = yield call(dbNotes.deleteNoteRecord,action.id);
  console.log("response ==>", response);
  yield call(noteDataList);
}


export function * editNotes(action){
  console.log("actionUPdate",action.id);
  console.log("actionUPdate",action.data);
  const response = yield call(dbNotes.updateNoteRecord,action.id,action.data);
  console.log("response ==>", response);
  yield call(noteDataList);
}
