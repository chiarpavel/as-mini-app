import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Card, CardMedia } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Field from './Field';
import { formatPrice } from '../utils';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    caption: {
        color: 'gray'
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    },
    card: {
        height: '150px',
        width: '150px'
    },
    image: {
        height: '150px',
        width: '150px'
    }
});

// id, name, description, location, sold price & currency, type, 1 image

function PropertyList({ property }) {
    const classes = useStyles();
    const {
        id,
        name,
        description,
        sold_price: soldPrice,
        currency,
        type,
        images
    } = property;
    const imageUrl = images?.[0];

    return (
        <ListItem button className={classes.root} component={Link} to={`/properties/${id}`}>
            <Container className={classes.heading}>
                <Typography variant="h5">{name}</Typography>
                <Typography className={classes.caption} variant="caption">{id}</Typography>
            </Container>
            <Container className={classes.content}>
                <ListItemText className={classes.details}>
                    <Field caption="Description">{description}</Field>
                    <Field caption="Price">{formatPrice(soldPrice, currency)}</Field>
                    <Field caption="Type">{type}</Field>
                </ListItemText>
                <Card className={classes.card}>
                    <CardMedia className={classes.image} image={imageUrl} />
                </Card>
            </Container>
        </ListItem>
    );
}

export default PropertyList;
