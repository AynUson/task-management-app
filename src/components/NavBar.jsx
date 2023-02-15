import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import NoteIcon from "@mui/icons-material/Note";
import * as authService from "../services/auth";
const NavBar = ({ onLogout, currentUser }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <div>
              <NoteIcon />
              Task Management App
            </div>
          </Typography>
          <div>
            {currentUser ? (
              <>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ marginRight: 2 }}
                >
                  Welcome, {currentUser.name} 🤓
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button LinkComponent={Link} to="/register" color="inherit">
                  Register
                </Button>
                <Button LinkComponent={Link} to="/login" color="inherit">
                  Login
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
