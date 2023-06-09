/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from '../features/login/sagas';
import { usersSagas } from '../features/users/list/sagas';
import { editUsersSagas } from '../features/users/details/sagas';
import { rolSagas } from '../features/rol/list/sagas';
import { editRolSagas } from '../features/rol/details/sagas';
import { ownerSagas } from '../features/owner/list/sagas';
import { editOwnerSagas } from '../features/owner/details/sagas';
import { gpsSagas } from '../features/gps/list/sagas';
import { editGpsSagas } from '../features/gps/details/sagas';
import { userOwnerSagas } from '../features/user_owner/list/sagas';
import { editUserOwnerSagas } from '../features/user_owner/details/sagas';

import { deviceOwnerSagas } from '../features/device_owner/list/sagas';
import { editDeviceOwnerSagas } from '../features/device_owner/details/sagas';


export default function* rootSaga() {
    yield all([
        ...loginSagas,
        ...usersSagas,
        ...editUsersSagas,
        ...rolSagas,
        ...editRolSagas,
        ...ownerSagas,
        ...editOwnerSagas,
        ...gpsSagas,
        ...editGpsSagas,
        ...userOwnerSagas,
        ...editUserOwnerSagas,
        ...deviceOwnerSagas,
        ...editDeviceOwnerSagas
    ]);
}
