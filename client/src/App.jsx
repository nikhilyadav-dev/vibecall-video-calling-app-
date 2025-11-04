import "./App.css";
import AuthForm from "./pages/Auth/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import IsloggedIn from "./pages/Auth/IsLoggedIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<IsloggedIn />}>
          <Route path="/" element={<Dashboard />}></Route>
        </Route>
        <Route path="/login" element={<AuthForm type={"login"} />}></Route>
        <Route path="/signup" element={<AuthForm type={"signup"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
