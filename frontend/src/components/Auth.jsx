import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './date.css'


export default function Auth({ isSignup, setisSignup }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const sendRequest = async (type = "signin") => {
        const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch((err) => console.log("axios error : " + err));

        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            sendRequest("signup")
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => { dispatch(authActions.signin()); })
                .then(() => navigate("/blogs"))
                .then(data => console.log(data));
        } else {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => { dispatch(authActions.signin()); })
                .then(() => navigate("/blogs"))
                .then(data => console.log(data));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"}
                    maxWidth={400}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin='auto'
                    marginTop={5}
                    borderRadius={5}>
                    <Typography padding={3} textAlign="center" variant='h2' >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Typography>
                    {isSignup && <TextField margin="normal" onChange={handleChange} name="name" placeholder="Name" value={inputs.name} />}
                    <TextField margin="normal" onChange={handleChange} name="email" placeholder="Email" type="email" value={inputs.email} />
                    <TextField margin="normal" onChange={handleChange} name="password" placeholder="Password" type="password" value={inputs.password} />
                    <Button type="submit" variant="contained" color="warning" sx={{ margin: 1, marginTop: 3, borderRadius: 3, background: '#0079f3' }}>
                        Submit
                    </Button>
                    <Typography sx={{ margin: 1, marginTop: 3 }}>
                        {isSignup ? "Already have an account?" : "Do not have an account?"}
                        <Button onClick={() => setisSignup(!isSignup)} >
                            {isSignup ? "Sign In" : "Sign Up"}
                        </Button>Here
                    </Typography>

                    {/* Display date and time */}
                </Box>
            </form>
            <div className="datetime">
                        <div className="date">
                            <span>{currentTime.toLocaleDateString()}</span>
                        </div>
                        <div className="time">
                            <span>{currentTime.toLocaleTimeString()}</span>
                        </div>
                    </div>
        </div>
    );
}
