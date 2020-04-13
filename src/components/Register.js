import React, { useState } from 'react';
import { Container, Paper, TextField, Button, FormHelperText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions';

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
    }
});

function Register() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);

    return (
        <Container className={classes.container}>
            <Container className={classes.heading}>
                <Typography variant="h5" color="primary">CREATE ACCOUNT</Typography>
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
                    className={classes.textField}
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    disabled={session?.registerPending}
                    onClick={() => dispatch(register({ username, password, email }))}
                >
                    Register
                </Button>
                <FormHelperText error>{session?.registerError}</FormHelperText>
            </Paper>
            <Paper className={`${classes.paper} ${classes.linkPaper}`} elevation={3}>
                Already have an account?<span> </span><Link to="/login">Login</Link>
            </Paper>
        </Container>
    );
}

export default Register;
