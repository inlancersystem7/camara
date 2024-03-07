// src/redux/sagas/counterSaga.ts
import { takeLatest, put } from 'redux-saga/effects';
import { INCREMENT, DECREMENT } from '../actions/types';

function* incrementSaga() {
  // You can add additional logic here if needed
  yield put({ type: INCREMENT });
}

function* decrementSaga() {
  // You can add additional logic here if needed
  yield put({ type: DECREMENT });
}

export function* watchCounter() {
  yield takeLatest(INCREMENT, incrementSaga);
  yield takeLatest(DECREMENT, decrementSaga);
}
