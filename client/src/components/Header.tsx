import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Import the home icon
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Use IconButton with HomeIcon for navigation to the home page */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          size="large"
          component={Link}
          to="/"
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              {user.role === "admin" && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
