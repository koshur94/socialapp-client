import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
    ...theme.spreadThis,
    profileImage: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    dialogContent: {
        padding: '2%'
    },
    closeButton: {
        position: 'absolute',
        left: '85%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        
        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {
        const {
            classes,
            scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments},
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={1} />
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={3}>
                    <img src={userImage} alt='Profile' className={classes.profileImage}/>
                </Grid>
                <Grid item sm={9}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h6'
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    {/* <hr className={classes.invisibleSeparator}/> */}
                    <Typography variant='subtitle2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    {/* <hr className={classes.invisibleSeparator}/> */}
                    <Typography variant='body2'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <small>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</small>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <small>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</small>
                </Grid>
                {/* <hr className={classes.visibleSeparator} /> */}
                <CommentForm screamId={screamId}/>
                <Comments comments={comments} />
            </Grid>
        );

        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand scream' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <MyButton
                        tip='Close'
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
};

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))
