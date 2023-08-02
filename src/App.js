import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MainRoutes from "./MainRoutes";
import { SnackbarProvider } from "notistack";
import UsersProvider from "./context/UsersProvider";

function App() {
  return (
    <SnackbarProvider maxSnack={10}>
      <UsersProvider>
        <MainRoutes />;
      </UsersProvider>
    </SnackbarProvider>
  );
}

export default App;
