import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./components/PostDetail";
import PrivateRoute from "./components/PrivateRoute"; // Ensure PrivateRoute is adapted for v6
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext"; // Import the context provider

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AuthProvider>
          {/* Wrap the Router in AuthProvider */}
          <Router>
            <Header />
            <Routes>
              {/* Use Routes instead of Switch */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/posts/:postId" element={<PostDetail />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              {/* More routes as needed */}
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
