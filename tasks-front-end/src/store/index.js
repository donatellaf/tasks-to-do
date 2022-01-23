import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { loadState } from "./localStorage";
import rootReducer from "./rootReducer";
import rootSaga from "./sagas/sagas";

const devMode = process.env.NODE_ENV === "development";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});

const middlewares = [];

middlewares.push(sagaMiddleware);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

if (devMode) {
  middlewares.push(loggerMiddleware);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (preloadedState = loadState("state")) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [...middlewares],
    preloadedState,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
