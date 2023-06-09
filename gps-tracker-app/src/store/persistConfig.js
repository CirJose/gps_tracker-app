// import AsyncStorage from "@react-native-community/async-storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import sessionStorage from "redux-persist/es/storage/session";

/**
 * @see https://medium.com/@edisondevadoss/how-to-use-redux-persist-in-react-application-35943c1d8292
 */
const persistConfig = {
    // storage: AsyncStorage, 
    storage: sessionStorage,
    key: "app-auth",
    stateReconciler: autoMergeLevel2
    // blacklist: [], // colocar los action types que no se desean almacenar en el store 
    // whitelist: ["user", "authToken","loginReducer"] // colocar los action types que se desean almacenar en el store 
};

// const clearAppData = async function() {
//     try {
//         const keys = await AsyncStorage.getAllKeys();
//         await AsyncStorage.multiRemove(keys);
//     } catch (error) {
//         console.error('Error clearing app data.');
//     }
// }

export default persistConfig;