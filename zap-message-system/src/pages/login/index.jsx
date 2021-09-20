import React from "react";
import { Button, TextField, Grid, Paper, Typography} from "@material-ui/core";
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import './styles.css'
import StoreContext from "../../components/store/context";


const login = (username, password) => {
    if(username === "admin" && password === "admin") {
        return { token: 1234}
    } else {
        Swal.fire("Erro!", "Usuário ou senha incorretos!", "error")
        return { error: 'Usuário ou senha inválido!' }
    }
}


const Login = () => {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useContext(StoreContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { token } = login(username, password);

        if(token) {
            setToken(token);
            return history.push("/dashboard")
        }

        setUsername("");
        setPassword("");

    }

    return (
        <div >
            <Grid className="loginCard" container spacing={0}  direction="row">
                <Grid item>
                    <Grid container direction="column" justify="center" spacing={2} className="login-form">
                        <Paper variant="elevation" elevation={2} className="login-background" >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Faça o login
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={handleSubmit}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField 
                                                type="text"
                                                placeholder="Email"
                                                fullWidth
                                                name="username"
                                                variant="outlined"
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)}
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Senha"
                                                fullWidth
                                                name="password"
                                                variant="outlined"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button  variant="contained" color="primary" type="submit" className="button-block" > Entrar </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );

}

export default Login;