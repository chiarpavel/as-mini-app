import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropertyListFilters from './PropertyListFilters';
import PropertyList from './PropertyList';
import Header from './Header';

const useStyles = makeStyles({
    container: {
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 0,
        margin: 0,
        backgroundColor: 'lightgrey',
        overflow: 'auto'
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        padding: '4vh 5vw',
        backgroundColor: 'lightgrey'
    },
});

function PropertyListPage() {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Header title="Properties" />
            <Container className={classes.content}>
                <PropertyListFilters />
                <PropertyList />
            </Container>
        </Container>
    );
}

export default PropertyListPage;
