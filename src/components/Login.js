import React, { useState } from 'react';
import { Container, Paper, TextField, Button, FormHelperText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import config from '../config';
import { login, setSession, social } from '../actions';
import GoogleLogin from 'react-google-login';

const useStyles = makeStyles({
    heading: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        backgroundColor: 'lightgrey'
    },
    paper: {
        minWidth: '300px',
        display: 'flex',
        alignItems: 'stretch',
        padding: '4vmin',
        margin: '2vh',
        flexDirection: 'column'
    },
    linkPaper: {
        whiteSpace: 'pre-wrap',
        flexDirection: 'row'
    },
    textField: {
        marginBottom: '2vh'
    },
    googleButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2vmin'
    }
});

function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container className={classes.container}>
            <Container className={classes.heading}>
                <Typography variant="h5" color="primary">LOGIN</Typography>
            </Container>
            <Paper className={classes.paper} elevation={3}>
                <TextField
                    variant="filled"
                    className={classes.textField}
                    label="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    variant="filled"
                    type="password"
                    className={classes.textField}
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(login({ username, password }))}
                    disabled={session?.pending}
                >
                    Login
                </Button>
                <GoogleLogin
                    clientId={config.googleClientId}
                    className={classes.googleButton}
                    onSuccess={({ profileObj, tokenId }) => dispatch(social({ token: tokenId, name: profileObj.name }))}
                    onFailure={() => dispatch(setSession({ error: 'Authentication failed' }))}
                    cookiePolicy="single_host_origin"
                />
                <FormHelperText error>{session?.error}</FormHelperText>
            </Paper>
            <Paper className={`${classes.paper} ${classes.linkPaper}`} elevation={3}>
                Don't have an account?<span> </span><Link to="/register">Register</Link>
            </Paper>
        </Container>
    );
}

export default Login;
