import AppRouter from "./routes/AppRouter";
import configureStore from "./store";
import throttle from "lodash/throttle";
import { saveState } from "./store/localStorage";
import { Provider } from "react-redux";

export const store = configureStore();

store.subscribe(
  throttle(() => {
    saveState("state", {
      loginReducer: store.getState().loginReducer,
    });
  }),
  1000
);

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
