/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { eliminarUsers } from "../../../../api/users/usersCrud";
import * as usersActions from "../store/actions";
// import { NavigationActions } from '@react-navigation/compat';

import { enableLoader, disableLoader } from "../../../loader/store/actions";

// Our worker Saga that logins the user
export default function* deleteUsersAsync(action) {
  yield put(enableLoader());

  try {
    //how to call api
    const response = yield call(eliminarUsers, action.payload);

    // Verificar que la respuesta es 200
    if (response.status === 200) {
      // Validamos la respuesta con resultado true para retornar como login válido
      if (response.data.result) {
        yield put(usersActions.onDeleteUsersResponse(response.data));
        yield put(disableLoader());
        yield put(usersActions.requestListaUsers({}));
      } else {
        yield put(usersActions.deleteUsersFailed({message:response.data.message}));
        yield put(disableLoader());
      }

      // no need to call navigate as this is handled by redux store with SwitchNavigator
      // yield call(navigationActions.navigateToHome);
    } else {
      yield put(usersActions.deleteUsersFailed({message:response.Message}));
      yield put(disableLoader());
    }

  } catch (error) {
    yield put(usersActions.deleteUsersFailed({message:error.message}));
    yield put(disableLoader());
  }

}
