import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
