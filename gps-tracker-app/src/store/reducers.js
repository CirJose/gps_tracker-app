/*
 * combines all th existing reducers
 */
import * as languageReducer from '../translations/LanguageProvider/reducers';
import * as loaderReducer from '../features/loader/store/reducers';
import * as loginReducer from '../features/login/store/reducers';
import * as usersReducer from '../features/users/list/store/reducers';
import * as editUsersReducer from '../features/users/details/store/reducers';
import * as rolReducer from '../features/rol/list/store/reducers';
import * as editRolReducer from '../features/rol/details/store/reducers';
import * as ownerReducer from '../features/owner/list/store/reducers';
import * as editOwnerReducer from '../features/owner/details/store/reducers';
import * as gpsReducer from '../features/gps/list/store/reducers';
import * as editGpsReducer from '../features/gps/details/store/reducers';
import * as userOwnerReducer from '../features/user_owner/list/store/reducers';
import * as editUserOwnerReducer from '../features/user_owner/details/store/reducers';

import * as deviceOwnerReducer from '../features/device_owner/list/store/reducers';
import * as editDeviceOwnerReducer from '../features/device_owner/details/store/reducers';


import { combineReducers } from "redux";

const rootReducer = combineReducers({
  languageReducer: languageReducer.languageProviderReducer,
  loaderReducer: loaderReducer.loaderReducer,
  loginReducer: loginReducer.loginReducer,
  usersReducer: usersReducer.usersReducer,
  editUsersReducer: editUsersReducer.editUsersReducer,
  rolReducer: rolReducer.rolReducer,
  editRolReducer: editRolReducer.editRolReducer,
  ownerReducer: ownerReducer.ownerReducer,
  editOwnerReducer: editOwnerReducer.editOwnerReducer,
  gpsReducer: gpsReducer.gpsReducer,
  editGpsReducer: editGpsReducer.editGpsReducer,
  userOwnerReducer: userOwnerReducer.userOwnerReducer,
  editUserOwnerReducer: editUserOwnerReducer.editUserOwnerReducer,
  deviceOwnerReducer: deviceOwnerReducer.deviceOwnerReducer,
  editDeviceOwnerReducer: editDeviceOwnerReducer.editDeviceOwnerReducer
});

export default rootReducer;
