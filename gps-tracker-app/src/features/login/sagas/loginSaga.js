/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import { login, introspect } from "../../../api/login/loginCrud";
import * as loginActions from '../store/actions';
// import { NavigationActions } from '@react-navigation/compat';

import { enableLoader, disableLoader } from '../../loader/store/actions';//"app/features/loader/store/actions";

// Our worker Saga that logins the user
export function* loginAsync(action) {
  yield put(enableLoader());

  try {
    // console.warn(action);
    //how to call api
    //const response = yield call(loginUser, action.username, action.password);
    const response = yield call(login, action.username, action.password);

    //mock response
    // const response = { success: true, data: { id: 1 } };
    // console.warn(response);
    // Verificar que la respuesta es 200
    if (response.status === 200) {
      // Validamos la respuesta con resultado true para retornar como login válido
      if (response.data.result) {
        // const terminos = response.data.user.term_us == "1" ? true : false;
        yield put(loginActions.onLoginResponse(response.data.result));
        yield put(loginActions.requestIntrospect());
        yield put(disableLoader({}));
      } else {
        yield put(loginActions.loginFailed());
        yield put(disableLoader({}));
        setTimeout(() => {
          // Alert.alert('Usuario y/o contraseña no válidos', response.data.message);
        }, 200);
      }

      // no need to call navigate as this is handled by redux store with SwitchNavigator
      //yield call(navigationActions.navigateToHome);
    } else {
      yield put(loginActions.loginFailed());
      yield put(disableLoader({}));
      setTimeout(() => {
        // Alert.alert('Lo sentimos exitió un error de conexión, vuelva a intentarlo más tarde', response.Message);
      }, 200);
    }
  } catch (error) {
    yield put(loginActions.loginFailed());
    // yield put(listaViajesActions.listaViajesProgramadosFailed({ message: error.message }));
    yield put(disableLoader());
  }
}



export function* introspectAsync(action) {
  yield put(enableLoader());
  
  try {
    //how to call api
    //const response = yield call(loginUser, action.username, action.password);
    const response = yield call(introspect);

    // Verificar que la respuesta es 200
    if (response.status === 200) {
      // Validamos la respuesta con resultado true para retornar como login válido
      if (response.data.result) {
        yield put(loginActions.onIntrospectResponse(response.data));
        yield put(disableLoader());
      } else {
        yield put(loginActions.introspectFailed());
        yield put(disableLoader());
      }

      // no need to call navigate as this is handled by redux store with SwitchNavigator
      //yield call(navigationActions.navigateToHome);
    } else {
      yield put(loginActions.introspectFailed());
      yield put(disableLoader());
    }
  } catch (error) {
    yield put(loginActions.introspectFailed());
    // yield put(listaViajesActions.listaViajesProgramadosFailed({ message: error.message }));
    yield put(disableLoader());
  }
}