import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
// const logger = createLogger();
const middleware = [ReduxThunk];

const initialState = {
  collapsed: true,
  user: {},
  devices: [],
  entornos: []
  // devices: [
  //   { _id: 1, name: 'electrovalvula', description: 'control electronico del agua', wifi: 'si tengo' },
  //   { _id: 2, name: 'sensor humedad', description: 'sensado de la humedad en el suelo', wifi: 'si tengo' },
  //   { _id: 3, name: 'sensor humedad y temperatura', description: 'sensado de temperatura y humedad en el aire', wifi: 'si tengo' },
  // ],
  // entornos: [
  //   { _id: 1, name: 'Flores', description: 'Flores para escencias' },
  //   { _id: 2, name: 'Vegetales', description: 'Para el consumo de la casa' },
  //   { _id: 3, name: 'Hierbas', description: 'para remedios medicinales caseros' },
  // ]
}

const store = createStore(rootReducer, initialState, composeEnhancers(
  applyMiddleware(...middleware),
));
export default store;
