import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    ...theme.spreadThis,
    card: {
        display: 'flex',
        marginBottom: 8
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 20
    },
    cover: {
        minWidth: '20%',
        opacity: '.5',
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 15,
        backgroundColor: '#00bcd4',
        marginBottom: 5
    },
    date: {
        height: 12,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        marginBottom: 7
    },
    fullLine: {
        height: 12,
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        marginBottom: 7
    },
    halfLine: {
        height: 12,
        width: '50%',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        marginBottom: 7
    }
})

const ScreamSkeleton = props => {
    const { classes } = props;
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
            </CardContent>
        </Card>
    ))

    return (
        <Fragment>
            {content}
        </Fragment>
    )
};

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);