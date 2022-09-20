import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//PHASE1 session actions and reducer
import sessionReducer from './session';
import songReducer from "./songs";
import playlistReducer from "./playlist";
const rootReducer = combineReducers({
  session: sessionReducer,
  song: songReducer,
  playlists: playlistReducer
});
//PHASE1 session actions and reducer END
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
