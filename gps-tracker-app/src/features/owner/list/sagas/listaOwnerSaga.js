/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { listadoOwner } from "../../../../api/owner/ownerCrud";
import * as listaOwnerActions from "../store/actions";
// import { NavigationActions } from '@react-navigation/compat';

import { enableLoader, disableLoader } from "../../../loader/store/actions";

// Our worker Saga that logins the user
export default function* listaOwnerAsync(action) {
  yield put(enableLoader());

  try {
    //how to call api
    const response = yield call(listadoOwner, action.payload);

    // Verificar que la respuesta es 200
    if (response.status === 200) {
      // Validamos la respuesta con resultado true para retornar como login válido
      if (response.data.result) {
        ;
        yield put(listaOwnerActions.onListaOwnerResponse(response.data));
        yield put(disableLoader());
      } else {
        yield put(listaOwnerActions.listaOwnerFailed({message:response.data.message}));
        yield put(disableLoader());
      }

      // no need to call navigate as this is handled by redux store with SwitchNavigator
      // yield call(navigationActions.navigateToHome);
    } else {
      yield put(listaOwnerActions.listaOwnerFailed({message:response.Message}));
      yield put(disableLoader());
    }

  } catch (error) {
    yield put(listaOwnerActions.listaOwnerFailed({message:error.message}));
    yield put(disableLoader());
  }

}
