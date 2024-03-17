import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";

// Define the user interface according to your user model
interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  age: number;
}

// Default user state for initialization
const defaultUserState: IUser = {
  _id: "",
  name: "",
  username: "",
  email: "",
  age: 18, // Default age or minimum age as per your application logic
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<IUser>(defaultUserState);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        // Adjust with your API endpoint for fetching user details
        const response = await axios.get<IUser>(
          "http://localhost:5000/api/users/details"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("Error fetching user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: name === "age" ? parseInt(value, 10) : value });
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      // Adjust with your API endpoint for updating user details
      await axios.put(
        `http://localhost:5000/api/users/update/${user._id}`,
        user
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        variant="outlined"
        value={user.name}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Username"
        name="username"
        variant="outlined"
        value={user.username}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        value={user.email}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Age"
        name="age"
        type="number"
        variant="outlined"
        value={user.age.toString()}
        onChange={handleInputChange}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateProfile}
        disabled={isUpdating}
        sx={{ mt: 2 }}
      >
        {isUpdating ? "Updating..." : "Update Profile"}
      </Button>
    </Box>
  );
};

export default Dashboard;
