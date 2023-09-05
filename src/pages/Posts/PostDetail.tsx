import { useRoute } from 'wouter';
import { useDataStore } from '@/store/postStore';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Comment, Post } from '@/types/common';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/authStore';

const PostDetail = () => {
  const [data, setData] = useState<Post>();
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const { fetchPost, loading, fetchComments } = useDataStore();
  const { auth } = useAuthStore();
  const [match, params] = useRoute('/posts/:id');
  const [yourComment, setYourComment] = useState<string>('');

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<string>('');

  useEffect(() => {
    if (match) {
      fetchPost(params.id).then((res) => {
        setData(res);
      });
      fetchComments(params.id).then((res) => {
        setCommentData(res);
      });
    }
  }, [fetchComments, fetchPost, match, params?.id]);

  useEffect(() => {
    if (editIndex) {
      setEditData(commentData.find((data) => data.id === editIndex)!.body);
    }
  }, [commentData, editIndex]);

  const onDeleteComment = (id: number) => {
    const matched = commentData.filter((data) => data.id !== id);
    setCommentData(matched);
  };

  const onEditComment = (id: number) => {
    setEditIndex(null);
    setEditData('');
    setEditIndex(id);
  };

  const onEditCommentDone = () => {
    const matched = commentData.find((data) => data.id === editIndex)!;
    const updatedData = { ...matched, body: editData };
    const updatedCommentData = commentData.map((res) =>
      res.id === matched.id ? updatedData : res
    );

    setCommentData(updatedCommentData);
    setEditIndex(null);
    setEditData('');
  };

  const onSubmitComment = () => {
    setYourComment('');
    if (match) {
      setCommentData([
        {
          name: auth.userName,
          body: yourComment,
          email: 'n/a',
          id: Math.random(),
          postId: parseInt(params.id)
        },
        ...commentData
      ]);
    }
  };

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
          <div className="w-full gap-2 flex">
            <Textarea
              placeholder="Type your message here."
              value={yourComment}
              onChange={(res) => setYourComment(res.currentTarget.value)}
            />
            <Button
              size={'sm'}
              variant={'outline'}
              className="self-end"
              onClick={onSubmitComment}>
              Submit
            </Button>
          </div>

          <span>Comments:</span>
          {commentData.map((res) => {
            return (
              <div
                className="border-gray-400 flex-col rounded-md flex border p-4 w-full gap-2"
                key={res.id}>
                <div className="text-blue-700 flex justify-between text-sm">
                  <span>{res.name}</span>
                  <span>{res.email}</span>
                </div>
                {editIndex === res.id ? (
                  <Textarea
                    placeholder="Type your message here."
                    value={editData}
                    onChange={(res) => setEditData(res.currentTarget.value)}
                  />
                ) : (
                  <p>{res.body}</p>
                )}
                {editIndex === res.id ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      className="w-1/12"
                      size={'sm'}
                      variant={'outline'}
                      onClick={() => onEditCommentDone()}>
                      Update
                    </Button>
                    <Button
                      className="w-1/12"
                      size={'sm'}
                      variant={'destructive'}
                      onClick={() => setEditIndex(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button
                      className="w-1/12"
                      size={'sm'}
                      variant={'outline'}
                      onClick={() => onEditComment(res.id)}>
                      Edit
                    </Button>
                    <Button
                      className="w-1/12"
                      size={'sm'}
                      variant={'destructive'}
                      onClick={() => onDeleteComment(res.id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </CardFooter>
      </Card>
    </>
  );
};

export default PostDetail;
