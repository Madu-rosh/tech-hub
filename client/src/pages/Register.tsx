import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [serverReply, setServerReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (
      Object.values(formData).some((field) => field.trim() === "") ||
      formData.password !== formData.confirmPassword
    ) {
      setServerReply(
        "Please ensure all fields are filled correctly and passwords match."
      );
      return;
    }

    if (parseInt(formData.age, 10) < 18) {
      setServerReply("You must be at least 18 years old to register.");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          ...dataToSend,
          age: parseInt(dataToSend.age, 10), // Convert age to number
        }
      );
      setServerReply(response.data.message || "Registration successful!"); // Use the server's response message
      navigate("/login"); // Redirect to login page on successful registration
    } catch (error) {
      let errorMessage = "An error occurred during registration.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setServerReply(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: 360,
        maxWidth: "95%",
        mx: "auto",
        textAlign: "center",
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {serverReply && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverReply}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        {/* Name */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {/* Username */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {/* Password */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {/* Age */}
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>
    </Box>
  );
};

export default Register;
