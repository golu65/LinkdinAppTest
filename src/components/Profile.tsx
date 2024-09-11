import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.posts);

  return (
    <Box sx={{ maxWidth: 450, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">Phone: {user?.phone}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Your Posts:
      </Typography>
      {posts.map((post) => (
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
        </Card>
      ))}
    </Box>
  );
};

export default Profile;
