// src/redux/sagas/notesSaga.ts
import { call, put } from "redux-saga/effects";
import { showMessage } from "react-native-flash-message";
import * as clientAction from "../actions/clientAction";
import { dbClient } from "@/WaterMelon/DBHelper/DBClient";

export function * newClient(action){
  const {
    data
  } =action
  const response = yield call(dbClient.saveClient,{data});
  console.log("response ==>", response);
  yield call(ClientList);
}

export function * editClient(action){
  const response = yield call(dbClient.updateClientRecord,action.id,action.data);
  yield call(ClientList);
}

export function * deleteClient(action){
  console.log("delete ation",action.id);
  const response = yield call(dbClient.deleteClientRecord,action.id);
  yield call(ClientList);
}

export function * ClientList(action) {
  const response = yield call(dbClient.getClientData);
  if (response) {
    yield put(clientAction.getClientList(response));
    if (action?.resolve) {
      action?.resolve(response);
    }
  } else {
    yield put(clientAction.getClientFailed());
    showMessage({
      message: 'failed',
      description: response.error,
      type: 'danger',
    });
  }
}

export function * dashboardClientList(action) {
  try {
    const response = yield call(dbClient.getClientData);
    if (response) {
      // Get the first five entries from the response
      const firstFiveClients = response.slice(0, 7);
      console.log("firstFiveClients",firstFiveClients);
      yield put(clientAction.getDashboardClientList(firstFiveClients));
      if (action?.resolve) {
        action.resolve(firstFiveClients);
      }
    } else {
      yield put(clientAction.getClientFailed());
      showMessage({
        message: 'Failed',
        description: 'Error fetching client data',
        type: 'danger',
      });
    }
  } catch (error) {
    yield put(clientAction.getClientFailed());
    showMessage({
      message: 'Failed',
      description: error.message,
      type: 'danger',
    });
  }
}
