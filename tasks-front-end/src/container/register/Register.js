import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { registerRequest } from "../../store/slices/register/register";

const Register = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    formValues.onSuccess = () => navigate("./login");
    dispatch(registerRequest(formValues));
  };

  return (
    <Paper elevation={15} sx={{ width: 500 }}>
      <form onSubmit={handleRegister}>
        <Grid container spacing={3} p={5} textAlign="center">
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Registro
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
              label="Contraseña"
              helperText=" "
              name="password"
              type="password"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "end", marginTop: -5 }}>
            <Link href="/login">
              <Typography variant="caption">
                Ya tenes cuenta ? Ingresa
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 200, height: 50 }}
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Register;
