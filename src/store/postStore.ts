import { create } from 'zustand';
import { Post, Comment } from '@/types/common';
import axios from 'axios';

interface DataStore {
  posts: Post[];
  loading: boolean;
  isError: boolean;
  fetchPosts: () => Promise<void>;
  fetchPost: (id: string) => Promise<Post>;
  fetchComments: (id: string) => Promise<Comment[]>;
  onDeletePost: (id: number) => void;
}

export const useDataStore = create<DataStore>((set, get) => ({
  posts: [],
  loading: false,
  isError: false,
  fetchPosts: async () => {
    console.log('Fetching POST LIST');
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      set((state) => ({ data: (state.posts = response.data), loading: false }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  fetchPost: async (id: string) => {
    console.log('Fetching POST');
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return response.data;
    } catch (error) {
      set(() => ({ hasErrors: true, loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  fetchComments: async (id: string) => {
    console.log('Fetching COMMENT LIST');
    set(() => ({ loading: true }));
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      return response.data;
    } catch (error) {
      set(() => ({ hasErrors: true, loading: false }));
    } finally {
      set(() => ({ loading: false }));
    }
  },
  onDeletePost: (id: number) => {
    const matched = get().posts.filter((post) => post.id !== id);
    set({ posts: matched });
  }
}));
