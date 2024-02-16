// App.js

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';
import BlogDetails from './components/BlogDetails';
import UserBlogs from './components/UserBlogs';


import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './store';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [isSignup, setisSignup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.signin());
    }
  }, []);

  return (
    <React.Fragment>
      <header>
        <Header isSignup={isSignup} setisSignup={setisSignup} />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth isSignup={isSignup} setisSignup={setisSignup} />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
