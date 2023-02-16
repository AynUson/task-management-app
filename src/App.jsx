import logo from "./logo.svg";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import * as authService from "./services/auth";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import TaskPage from "./pages/TaskPage";
import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(authService.getAccessToken);
  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      console.log(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };
  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
  };
  return (
    <>
      <CssBaseline />
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />}></Route>
          <Route
            path="/tasks"
            element={
              accessToken ? (
                <TaskPage currentUser={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasks/new"
            element={
              accessToken ? (
                <AddTaskPage currentUserId={currentUser.sub} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/tasks/:id/edit"
            element={
              accessToken ? (
                <EditTaskPage currentUserId={currentUser.sub} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/register"
            element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={
              accessToken ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          {/* <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} /> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
