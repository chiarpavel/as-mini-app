import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Card, CardMedia, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Field from './Field';
import Map from './Map';
import { formatPrice } from '../utils';

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
        padding: '4vmin',
        flexDirection: 'column'
    },
    paper: {
        padding: '4vmin 2vmin'
    },
    imageContainer: {
        display: 'block'
    },
    imageCard: {
        display: 'inline-block',
        height: '300px',
        width: '300px',
        margin: '2vmin'
    },
    image: {
        height: '300px',
        width: '300px',
    }
});

function PropertyDetailsPage() {
    const classes = useStyles();
    const { id } = useParams();
    const property = useSelector(state => state.properties?.data?.find(property => property.id === id));

    const {
        name,
        description,
        images,
        location,
        sold_price: soldPrice,
        currency,
        type
    } = property || { currency: 'USD' };
    const price = formatPrice(soldPrice, currency);

    return (
        <Container className={classes.container}>
            <Header title={name} />
            <Container className={classes.content}>
                <Paper className={classes.paper}>
                    <Field caption="ID">{id}</Field>
                    <Field caption="Description">{description}</Field>
                    <Field caption="Price">{price}</Field>
                    <Field caption="Type">{type}</Field>
                    {location && (
                        <Field caption="Location">
                            <Map location={location}/>
                        </Field>
                    )}
                    {images?.length && (
                        <Field caption="Images">
                            <Container className={classes.imageContainer}>
                                {images.map((url, index) => (
                                    <Card className={classes.imageCard} key={index}>
                                        <CardMedia className={classes.image} image={url} />
                                    </Card>
                                ))}
                            </Container>
                        </Field>
                    )}
                </Paper>
            </Container>
        </Container>
    );
}

export default PropertyDetailsPage;
