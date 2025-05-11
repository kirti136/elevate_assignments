import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Task from "./page/Task";
import Login from "./page/login";
import Signup from "./page/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
