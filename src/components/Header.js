import React from 'react';
import { Paper, Typography, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions';

const useStyles = makeStyles({
    header: {
        padding: '2vh 5vw',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: '0 0 auto'
    },
    session: {
        display: 'flex',
        alignItems: 'center',
        flexBasis: 0,
        margin: 0
    },
    button: {
        margin: '0 2vmin',
    }
});

function Header({ title }) {
    const classes = useStyles();
    const { username, name } = useSelector(state => state.session);
    const dispatch = useDispatch();

    return (
        <Paper className={classes.header} elevation={3} square>
            <Typography variant="h5">{title}</Typography>
            <Container className={classes.session}>
                <Typography>{username || name}</Typography>
                <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => dispatch(logout())}
                >
                    LOGOUT
                </Button>
            </Container>
        </Paper>
    );
}

export default Header;
