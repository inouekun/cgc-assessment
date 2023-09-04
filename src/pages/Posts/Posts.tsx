import { useEffect } from 'react';
import { useDataStore } from '@/store/postStore';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useLocation } from 'wouter';

const Posts = () => {
  const { posts, loading, fetchPosts } = useDataStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts, fetchPosts]);

  const onCardClickHandler = (id: number) => {
    setLocation(`/posts/${id.toString()}`);
  };

  if (loading) return <span>Loading ...</span>;

  return (
    <>
      <h3 className="font-semibold text-lg py-4">List of posts</h3>
      <div className="flex gap-6 flex-col">
        {posts.map((res) => (
          <Card
            key={res.id}
            className="cursor-pointer"
            onClick={() => onCardClickHandler(res.id)}>
            <CardHeader>
              <CardTitle>{res.title}</CardTitle>
              <CardDescription>{res.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Posts;
