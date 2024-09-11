import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: string;
  content: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts = [{ ...action.payload, isLiked: false }, ...state.posts];
    },
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find((post) => post.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
  },
});

export const { addPost, likePost, addComment } = postSlice.actions;
export default postSlice.reducer;
