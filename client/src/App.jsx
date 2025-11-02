import "./App.css";
import AuthForm from "./pages/Auth/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm type={"login"} />}></Route>
        <Route path="/signup" element={<AuthForm type={"signup"} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
