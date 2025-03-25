import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await fetch("/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setError(data.error || "Invalid email or password");
                return; // Stop execution here if login fails
            }
    
            if (data.token) {
                login(data); // Updates AuthContext (Triggers UI re-render)
                navigate("/"); // Redirect to homepage
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };
    

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper sx={{ padding: 3, width: 300 }}>
                <Typography variant="h6">Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
                <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Paper>
        </Box>
    );
}
