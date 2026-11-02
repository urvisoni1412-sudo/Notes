import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;