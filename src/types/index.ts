export interface User {
  id: string;
  phone: string;
}

export interface Post {
  id: string;
  content: string;
  likes: number;
  comments: string[];
}
