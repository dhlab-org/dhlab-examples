import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usePostPostsByPostIdCommentsMutation } from '@/entities/comments/api/mutations';
import { COMMENTS_QUERY_KEY, useGetPostsByPostIdCommentsQuery } from '@/entities/comments/api/queries';
import { useGetPostsByIdQuery } from '@/entities/posts/api/queries';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetailComponent,
});

function PostDetailComponent() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');

  // API 훅들 사용
  const { data: post, isLoading: postLoading, error: postError } = useGetPostsByIdQuery(postId);
  const { data: comments = [], isLoading: commentsLoading } = useGetPostsByPostIdCommentsQuery(postId);

  const addCommentMutation = usePostPostsByPostIdCommentsMutation({
    onSuccess: () => {
      // 댓글 추가 성공 후 댓글 목록 새로고침
      queryClient.invalidateQueries({
        queryKey: COMMENTS_QUERY_KEY.GET_POSTS_POSTID_COMMENTS(postId),
      });
      setNewComment('');
      toast.success('댓글이 등록되었습니다.');
    },
    onError: () => {
      toast.error('댓글 등록에 실패했습니다.');
    },
  });

  useEffect(() => {
    // 로그인 체크
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate({ to: '/login' });
      return;
    }
  }, [navigate]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    addCommentMutation.mutate({
      postId,
      body: { content: newComment },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={line} className="text-xl font-semibold mt-6 mb-3">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.trim() === '') {
        return <br key={line} />;
      }
      return (
        <p key={line} className="mb-3 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다</h1>
          <Button onClick={() => navigate({ to: '/posts' })}>목록으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <Button variant="outline" onClick={() => navigate({ to: '/posts' })} className="mb-6">
          ← 목록으로 돌아가기
        </Button>

        {/* 게시글 내용 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl font-bold leading-tight">{post.title}</CardTitle>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                작성자: {post.author?.username} • {formatDate(post.createdAt)}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">{formatContent(post.content)}</div>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">댓글 ({commentsLoading ? '...' : comments.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 댓글 작성 */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">댓글 작성</h3>
              <Textarea
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                disabled={addCommentMutation.isPending}
              />
              <Button onClick={handleSubmitComment} disabled={addCommentMutation.isPending || !newComment.trim()}>
                {addCommentMutation.isPending ? '등록 중...' : '댓글 등록'}
              </Button>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {commentsLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">댓글을 불러오는 중...</p>
                </div>
              ) : comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{comment.author?.username}</span>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
