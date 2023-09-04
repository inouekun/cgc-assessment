import { useRoute } from 'wouter';
import { useDataStore } from '../../store/postStore';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { useEffect, useState } from 'react';
import { Comment, Post } from '../../types/common';

const PostDetail = () => {
  const [data, setData] = useState<Post>();
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const { fetchPost, loading, fetchComments } = useDataStore();
  const [match, params] = useRoute('/posts/:id');

  useEffect(() => {
    if (match) {
      fetchPost(params.id).then((res) => {
        setData(res);
      });
      fetchComments(params.id).then((res) => {
        setCommentData(res);
      });
    }
  }, []);

  if (!match) return <div>Route not found</div>;
  if (loading) return <span>Loading ...</span>;
  if (!data) return <span>Not found</span>;

  return (
    <>
      <h3 className="font-semibold text-lg py-4">Detail of the post</h3>
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.body}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col justify-start items-start gap-4">
          <span>Comment Section:</span>
          {commentData.map((res) => {
            return (
              <div
                className="border-gray-400 flex-col rounded-md flex border p-4 w-full"
                key={res.id}>
                <div className="text-blue-700 flex justify-between text-sm">
                  <span>{res.name}</span>
                  <span>{res.email}</span>
                </div>
                <p>{res.body}</p>
              </div>
            );
          })}
        </CardFooter>
      </Card>
    </>
  );
};

export default PostDetail;
