import React, { useState } from "react";
import {Container, Button, Grid, Paper, TextField, Typography, IconButton, InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import Box from "@mui/material/Box";

const PasswordField = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={showPassword ? 'text' : 'password'}
            fullWidth
            label="Password"
            placeholder="Password"
            variant="outlined"
            required
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            sx={{ color: "#000" }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

const LoginForm = ({ onLogin }) => {
    const [values, setValues] = useState({
        email: "",
        pass: "",
        showPass: false,
    });
    const [error, setError] = useState("");

    const handleChange = () => {
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/login", {
                email: values.email,
                password: values.pass,
            })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                onLogin();
            })
            .catch((err) => {
                setError("Ошибка аутентификации.");
                console.error(err);
            });
    };

    return (
        <div>
            <Box
                sx={{
                    width: '98vw'
                }}>
            <Container maxWidth="sm">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    style={{ minHeight: `calc(100vh - 68px)` }}
                >
                    <Paper elevation={2} sx={{ padding: 5, backgroundColor: "#F5F5F5" }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        type="email"
                                        fullWidth
                                        label="Enter email"
                                        placeholder="Email Address"
                                        variant="outlined"
                                        required
                                        onChange={(e) => {
                                            setValues({ ...values, email: e.target.value });
                                            handleChange();
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <PasswordField
                                        onChange={(e) => {
                                            setValues({ ...values, pass: e.target.value });
                                            handleChange();
                                        }}
                                    />
                                </Grid>

                                {error && (
                                    <Grid item sx={{ textAlign: 'center' }}>
                                        <Typography variant="body2" color="error">
                                            {error}
                                        </Typography>
                                    </Grid>
                                )}

                                <Grid item sx={{ textAlign: 'center' }}>
                                    <Button
                                        type="submit" variant="contained" sx={{
                                            fontWeight: 'bold' }}
                                    >Sign in</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
            </Box>
        </div>
    );
};

export default LoginForm;
