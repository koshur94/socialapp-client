import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';


const styles = {
    card: {
        display: 'flex',
        position: 'relative',
        marginBottom: '1%'
    },
    image: {
        minWidth: '20%',

    },
    content: {
        paddingBottom: 0,
        padding: '2%',
        objectFit: 'cover',
        width: '80%',
        "&:last-child": {
            paddingBottom: 0
          }
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes,
                scream: {
                    body,
                    createdAt,
                    userImage,
                    userHandle,
                    screamId,
                    likeCount,
                    commentCount
                },
                user: {
                    authenticated,
                    credentials: {
                        handle
                    }
                }
            } = this.props;
            
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null;
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile image'
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant='h6'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='primary'
                        >
                        @{userHandle}
                    </Typography>
                    <Typography variant='subtitle2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body2'>{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <small>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</small>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <small>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</small>
                    {deleteButton}
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
