import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import PropertyListItem from './PropertyListItem';

const useStyles = makeStyles({
  root: {
    marginTop: '2vmin'
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  details: {
    display: 'flex',
  },
  paper: {
    padding: '2vmin'
  }
});

// id, name, description, location, sold price & currency, type, 1 image

function PropertyList() {
  const classes = useStyles();

  const properties = useSelector(state => {
    const nameFilter = state.filters.name.toLowerCase();
    const maxPriceFilter = state.filters.maxPrice;
    const list = state.properties?.data;

    if (!nameFilter && !maxPriceFilter) {
      return list;
    }

    return list?.filter(property => {
      if (nameFilter) {
        const propertyName = property.name.toLowerCase();
        if (!propertyName.includes(nameFilter)) {
          return false;
        }
      }

      if (maxPriceFilter) {
        const propertyPrice = property.sold_price;
        if (propertyPrice >= maxPriceFilter) {
          return false;
        }
      }

      return true;
    });
  });

  return (
    <div className={classes.root}>
      {properties?.length ? (
        <List component={Paper}>
          {properties.map(property => <PropertyListItem property={property} key={property._id} />)}
        </List>
      ) : (
        <Paper className={classes.paper}>
          <Typography className={classes.message}>No properties found</Typography>
        </Paper>
      )}
    </div>
  );
}

export default PropertyList;
