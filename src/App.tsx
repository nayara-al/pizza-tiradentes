import { BrowserRouter } from "react-router-dom";
import { Header } from "./components";
import "./style/global.css";
import { Routes } from "./routes";
import AppProvider from "./hook";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
