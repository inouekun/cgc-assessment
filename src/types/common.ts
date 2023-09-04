type Role = 'admin' | 'user';

export type Auth = {
  loggedIn: boolean;
  role: Role;
  userName: string;
};

export type LoginRequest = {
  userName: string;
  password: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
