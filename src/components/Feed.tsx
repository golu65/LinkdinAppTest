import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../services/postService';
import { RootState } from '../context/store';
import { addPost, likePost, addComment } from '../context/slices/postSlice';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [showCommentField, setShowCommentField] = useState<{ [key: string]: boolean }>({});
  const [showAllComments, setShowAllComments] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      fetchedPosts.forEach((post) => dispatch(addPost(post)));
    };

    loadPosts();
  }, [dispatch]);

  const handleCommentChange = (postId: string, text: string) => {
    setCommentText((prev) => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = (postId: string) => {
    if (!commentText[postId]) return;

    const newComment = {
      id: Math.random().toString(),
      content: commentText[postId],
    };

    dispatch(addComment({ postId, comment: newComment }));
    setCommentText((prev) => ({ ...prev, [postId]: '' }));
    setShowCommentField((prev) => ({ ...prev, [postId]: false }));
  };

  const toggleCommentField = (postId: string) => {
    setShowCommentField((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleShowAllComments = (postId: string) => {
    setShowAllComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <Box sx={{ maxWidth: 450, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        Feed
      </Typography>
      {posts.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          Please create a post
        </Typography>
      ) : (
        posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body1">{post.description}</Typography>
            </CardContent>
            {post.image && (
              <CardMedia
                component="img"
                image={post.image}
                alt="Post image"
                sx={{
                  width: 450,
                  height: 450,
                  objectFit: 'cover',
                  margin: 'auto',
                }}
              />
            )}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Button onClick={() => dispatch(likePost(post.id))}>
                <ThumbUpIcon color={post.isLiked ? 'primary' : 'inherit'} /> ({post.likes})
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <IconButton onClick={() => toggleCommentField(post.id)}>
                  <CommentIcon />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {post.comments.length}
                </Typography>
              </Box>
            </Box>
            {showCommentField[post.id] && (
              <Box sx={{ p: 1 }}>
                <TextField
                  placeholder="Add a comment..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={commentText[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleCommentSubmit(post.id)}
                >
                  Post
                </Button>
              </Box>
            )}
            {post.comments.length > 0 && (
              <List sx={{ pl: 1, pt: 0, pb: 0 }}>
                {post.comments.slice(0, 1).map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem sx={{ p: 1 }}>
                      <ListItemText
                        primary={comment.content}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {post.comments.length > 1 && (
                  <>
                    <Collapse in={showAllComments[post.id]} timeout="auto" unmountOnExit>
                      {post.comments.slice(1).map((comment) => (
                        <React.Fragment key={comment.id}>
                          <ListItem sx={{ p: 1 }}>
                            <ListItemText
                              primary={comment.content}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </Collapse>
                    <Button
                      size="small"
                      onClick={() => toggleShowAllComments(post.id)}
                      sx={{ ml: 2, mt: 1 }}
                    >
                      {showAllComments[post.id] ? 'Hide comments' : `Show more (${post.comments.length - 1} more)`}
                    </Button>
                  </>
                )}
              </List>
            )}
          </Card>
        ))
      )}
    </Box>
  );
};

export default Feed;
