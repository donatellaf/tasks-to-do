import AppRouter from "./routes/AppRouter";
import configureStore from "./store";
import throttle from "lodash/throttle";
import { saveState } from "./store/localStorage";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Notificator from "./container/notificator/Notificator";

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
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Notificator />
        <AppRouter />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
