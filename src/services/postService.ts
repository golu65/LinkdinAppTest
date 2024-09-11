import { Post } from '../context/slices/postSlice';

export const fetchPosts = async (): Promise<Post[]> => {
  return [
    // {
    //   id: '1',
    //   title: 'Sunset at the Beach',
    //   description: 'A beautiful sunset at the beach with waves crashing onto the shore.',
    //   image: 'https://via.placeholder.com/600x400?text=Sunset+at+the+Beach',
    //   likes: 12,
    //   comments: [
    //     { id: 'c1', username: 'user1', text: 'Amazing view!' },
    //     { id: 'c2', username: 'user2', text: 'Wish I was there!' },
    //   ],
    // }
  ];
};
