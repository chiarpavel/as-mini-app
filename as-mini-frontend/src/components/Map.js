import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import config from '../config';

const useStyles = makeStyles({
    root: {
        height: '40vmax',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: 'gray',
        padding: 0
    }
});

function Map({ location }) {
    const classes = useStyles();
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: config.googleMapsApiKey });
    const [lat, lng] = location.coordinates;

    return (
        <Container className={classes.root}>
            {isLoaded ? (
                <GoogleMap
                    id="circle-example"
                    // mapContainerStyle={{ height: "300px", width: "400px" }}
                    mapContainerStyle={{ flexGrow: 1 }}
                    zoom={7}
                    center={{ lat, lng }}
                />
            ) : (
                <div>loading...</div>
            )}
            {loadError && <div>{loadError}</div>}
        </Container>
    );
}

export default Map;
