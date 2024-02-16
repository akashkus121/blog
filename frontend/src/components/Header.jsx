import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material';
import { authActions } from "../store";

export default function Header({ isSignup, setisSignup }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  console.log(value);

  return (
    <AppBar position='sticky' sx={{ background: "linear-gradient(90deg,rgba(255, 0, 0, 1) 0%, rgba(0, 129, 255, 1) 49%, rgba(6, 35, 41, 1) 99%);" }}>
      <Toolbar>
        <Typography variant="h4">BlogApp</Typography>

        {isLoggedIn && (
          <Box display="flex" margin="0 auto">
            <Tabs value={value} onChange={(e, val) => setValue(val)} textColor="inherit">
              <Tab label="All Blogs" component={Link} to='/blogs' />
              <Tab label="My Blogs" component={Link} to='/myBlogs' />
              <Tab label="Add Blog" component={Link} to='/blogs/add' />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                component={Link}
                to='/auth'
                onClick={() => setisSignup(false)}
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: 'red' }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to='/auth'
                onClick={() => setisSignup(true)}
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: 'red' }}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.signout())}
              component={Link}
              to='/auth'
              variant="contained"
              sx={{ margin: 1, borderRadius: 10, background: 'red' }}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
