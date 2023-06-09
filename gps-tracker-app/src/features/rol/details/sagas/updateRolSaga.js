/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { actualizarRol } from "../../../../api/rol/rolCrud";
import * as rolActions from "../store/actions";
// import { NavigationActions } from '@react-navigation/compat';

import { enableLoader, disableLoader } from "../../../loader/store/actions";

// Our worker Saga that logins the user
export default function* updateRolAsync(action) {
  yield put(enableLoader());

  try {
    //how to call api
    const response = yield call(actualizarRol, action.payload);

    // Verificar que la respuesta es 200
    if (response.status === 200) {
      // Validamos la respuesta con resultado true para retornar como login válido
      if (response.data.result) {
        ;
        yield put(rolActions.onUpdateRolResponse(response.data));
        yield put(disableLoader());
      } else {
        yield put(rolActions.updateRolFailed({message:response.data.message}));
        yield put(disableLoader());
      }

      // no need to call navigate as this is handled by redux store with SwitchNavigator
      // yield call(navigationActions.navigateToHome);
    } else {
      yield put(rolActions.updateRolFailed({message:response.Message}));
      yield put(disableLoader());
    }

  } catch (error) {
    yield put(rolActions.updateRolFailed({message:error.message}));
    yield put(disableLoader());
  }

}
