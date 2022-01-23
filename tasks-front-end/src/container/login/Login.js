import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/slices/login/login";

const Login = () => {
  const [formValues, handleInputChange] = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(formValues));

    navigate("./tasks");
  };
  return (
    <Paper elevation={15} sx={{ width: 500 }}>
      <form onSubmit={handleLogin}>
        <Grid container spacing={3} p={5} textAlign="center">
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Usuario"
              name="username"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              helperText=" "
              label="Contraseña"
              name="password"
              type="password"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "end", marginTop: -5 }}>
            <Link href="/register">
              <Typography variant="caption">
                No tenes cuenta ? Registrate
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 200, height: 50 }}
            >
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Login;
