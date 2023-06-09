
import { logOut, onRefreshResponse } from "../../features/login/store/actions";
import { refresh } from "../../api/login/loginCrud";

export default function setupAxios(axios, store) {

  // Variables para el manejo del encolador de axios
  let isRefreshing = false;
  let failedQueue = [];

  // Procesamiento de multiples peticiones al tiempo
  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    })

    failedQueue = [];
  }

  // Interceptor para peticiones de axios
  axios.interceptors.request.use(
    config => {
      const { loginReducer } = store.getState();
      const {
        loginReducer: { authToken }
      } = store.getState();

      if (authToken) {
        // Si existe el authToken en el redux, se procede a enviar el token de barrrera en las peticiones
        config.headers.Authorization = `Bearer ${authToken.access_token}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );

  // Interceptor para respuestas de axios
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    const {
      loginReducer: { authToken }
    } = store.getState();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {

      // Consulta si está refrescando el token, en caso afirmativo coloca las peticones en el arreglo del encolador
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }


      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        // Se envia la consulta de access token por medio de promesa al servidor
        const access_token = refresh(authToken.refresh_token);

        // Resolver la promesa de refresh token enviada al servidor
        access_token.then(({ data }) => {
          // almacenar el estado actual en el redux persistente
          store.dispatch(onRefreshResponse(data));
          // Configurar que las peticiones de axios se realicen con el token de barrera actualizado
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.result.access_token;
          // Procesar la primera solicitud que encontró 401 y actualizar con el nuevo access token
          originalRequest.headers.Authorization = `Bearer ${data.result.access_token}`;
          // Procesar la cola de peticiones (promesas) que se encuentran esperando a ser procesadas
          processQueue(null, data.result.access_token);
          // Retornar el resultado de la promesa como un resolve y ejecutar axios con la petición original
          resolve(axios(originalRequest));
        }).catch((err) => {
          // Procesar la cola de peticiones (promesas) que se encuentran esperando a ser procesadas, indicando que exitió un error
          processQueue(err, null);
          // Retornar el resultado de la promesa como un reject
          reject(err);
          // Cerrar la sesión en caso de que error
          store.dispatch(logOut());
        }).finally(() => {
          // Actualizar el estado de la variable a false
          isRefreshing = false;
        })
      });

    }
    // En caso de que no sea un error 401 o un re intento de actualzar el token, se envia como promesa rechazada
    return Promise.reject(error);
  });

}
