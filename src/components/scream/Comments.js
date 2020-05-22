import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadThis,
    commentImage: {
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: '1%',
        minWidth: '100%'
    }
});

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <hr className={classes.visibleSeparator}/>
                            <Grid item sm={12}>
                                <Grid container spacing={1}>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt='comment' className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={10}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant='h6'
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color='primary'>
                                                    @{userHandle}
                                            </Typography>
                                            <Typography
                                                variant='subtitle2'
                                                color='textSecondary'>
                                                    {dayjs(createdAt).format('H:mm, MMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant='body2'>{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
};

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
