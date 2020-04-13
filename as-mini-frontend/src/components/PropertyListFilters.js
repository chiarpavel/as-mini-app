import React from 'react';
import { Paper, TextField, Typography } from '@material-ui/core';
import { FilterList as FilterListIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../actions';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '2vmin'
    },
    filter: {
        marginLeft: '2vmin'
    }
});

function PropertyListFilters() {
    const classes = useStyles();
    const filters = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const updateFilters = update => dispatch(setFilters({ ...filters, ...update }));

    return (
        <Paper className={classes.container}>
            <FilterListIcon />
            <Typography className={classes.filter}>Filters</Typography>
            <TextField
                variant="outlined"
                className={classes.filter}
                label="Name"
                value={filters.name}
                onChange={e => updateFilters({ name: e.target.value })}
            />
            <TextField
                variant="outlined"
                className={classes.filter}
                label="Max Price"
                type="number"
                inputProps={{ step: 100000 }}
                value={filters.maxPrice}
                onChange={e => updateFilters({ maxPrice: e.target.value })}
            />
        </Paper>
    );
}

export default PropertyListFilters;
