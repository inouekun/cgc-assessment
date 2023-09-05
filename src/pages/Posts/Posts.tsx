import { useEffect } from 'react';
import { useDataStore } from '@/store/postStore';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const Posts = () => {
  const { posts, loading, fetchPosts, onDeletePost } = useDataStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts, fetchPosts]);

  const onCardClickHandler = (id: number) => {
    setLocation(`/posts/${id.toString()}`);
  };

  const onCardDeleteHandler = (id: number) => {
    onDeletePost(id);
  };

  if (loading) return <span>Loading ...</span>;

  return (
    <>
      <h3 className="font-semibold text-lg py-4">List of posts</h3>
      <div className="flex gap-6 flex-col">
        {posts.map((res) => (
          <div key={res.id} className="flex gap-2 items-center">
            <Card
              className="cursor-pointer w-11/12"
              onClick={() => onCardClickHandler(res.id)}>
              <CardHeader>
                <CardTitle>{res.title}</CardTitle>
                <CardDescription>{res.body}</CardDescription>
              </CardHeader>
            </Card>
            <Button
              className="w-1/12"
              variant={'destructive'}
              onClick={() => onCardDeleteHandler(res.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
