import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import the jwtDecode function and JwtPayload type
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary

interface JWT {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from the auth context

  useEffect(() => {
    // Redirect if user is already logged in
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/dashboard"); // Adjust the route as necessary
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login", // Adjust as necessary
        formData
      );
      // Use the login function from the auth context
      login(response.data.token); // This should also handle setting the token in local storage

      const decodedToken: JWT = jwtDecode(response.data.token);
      console.log("Login successful", decodedToken);

      setError("");
      navigate("/dashboard"); // Navigate to Dashboard on successful login
    } catch (err) {
      // First, ensure err is an instance of Error
      if (axios.isAxiosError(err)) {
        // Now, TypeScript knows err is an AxiosError, providing auto-completion for err.response
        console.error("Login failed", err.response?.data);
        setError(err.response?.data.message || "An error occurred.");
      } else if (err instanceof Error) {
        // Handle generic error instances
        console.error("Login failed", err.message);
        setError(err.message || "An unknown error occurred.");
      } else {
        // Handle cases where err is not an Error instance
        console.error("Login failed", "An unexpected error occurred.");
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box sx={{ width: 300, mx: "auto", my: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  );
};

export default Login;
