import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '&+&': {
            marginTop: '2vh'
        }
    }
});

function Field({ caption, children }) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography variant="caption">{caption}</Typography>
            {children}
        </Container>
    );
}

export default Field;
