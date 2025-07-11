import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Textarea } from '@/shared/ui/textarea'
import { toast } from 'sonner'
import type { PostDto, CommentDto } from '@/shared/api/dto'

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetailComponent,
})

// 임시 게시글 데이터
const mockPost: PostDto = {
  id: 'post-1',
  title: '리액트 개발 팁과 모범 사례',
  content: `
이 글에서는 리액트 개발 시 유용한 팁과 모범 사례들을 소개하겠습니다.

## 1. 컴포넌트 설계 원칙

함수형 컴포넌트를 사용하고, 단일 책임 원칙을 따르세요. 각 컴포넌트는 하나의 명확한 목적을 가져야 합니다.

## 2. 상태 관리

useState와 useEffect를 적절히 활용하고, 복잡한 상태 관리가 필요한 경우 useReducer나 상태 관리 라이브러리를 고려하세요.

## 3. 성능 최적화

메모이제이션(React.memo, useMemo, useCallback)을 적절히 사용하여 불필요한 리렌더링을 방지하세요.

## 4. 코드 구조

깔끔하고 일관된 폴더 구조를 유지하고, 재사용 가능한 컴포넌트를 만들어 코드 중복을 줄이세요.

이러한 원칙들을 따르면 더 나은 리액트 애플리케이션을 개발할 수 있습니다.
  `,
  userId: 'user-1',
  status: 'PUBLISHED',
  tags: ['React', '개발팁', '모범사례'],
  createdAt: '2024-01-15T10:30:00Z',
  author: {
    id: 'user-1',
    username: '개발자김',
    email: 'developer@example.com',
  }
}

// 임시 댓글 데이터
const mockComments: CommentDto[] = [
  {
    id: 'comment-1',
    content: '정말 유용한 정보네요! 특히 성능 최적화 부분이 도움이 되었습니다.',
    userId: 'user-2',
    postId: 'post-1',
    createdAt: '2024-01-15T14:20:00Z',
    author: {
      id: 'user-2',
      username: '프론트엔드개발자',
      email: 'frontend@example.com',
    }
  },
  {
    id: 'comment-2',
    content: 'useCallback과 useMemo의 차이점에 대해 더 자세히 설명해주실 수 있나요?',
    userId: 'user-3',
    postId: 'post-1',
    createdAt: '2024-01-15T16:45:00Z',
    author: {
      id: 'user-3',
      username: '초보개발자',
      email: 'beginner@example.com',
    }
  },
]

function PostDetailComponent() {
  const { postId } = Route.useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostDto | null>(null)
  const [comments, setComments] = useState<CommentDto[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    // 로그인 체크
    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate({ to: '/login' })
      return
    }

    // 데이터 로드 시뮬레이션
    const loadPostAndComments = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 실제로는 API에서 postId로 데이터를 가져옴
      setPost({ ...mockPost, id: postId })
      setComments(mockComments.filter(comment => comment.postId === postId))
      setLoading(false)
    }

    loadPostAndComments()
  }, [postId, navigate])

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error('댓글 내용을 입력해주세요.')
      return
    }

    const userId = localStorage.getItem('userId')
    if (!userId) {
      toast.error('로그인이 필요합니다.')
      return
    }

    setSubmittingComment(true)
    
    try {
      // 댓글 추가 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newCommentData: CommentDto = {
        id: `comment-${Date.now()}`,
        content: newComment,
        userId,
        postId,
        createdAt: new Date().toISOString(),
        author: {
          id: userId,
          username: userId,
          email: `${userId}@example.com`,
        }
      }
      
      setComments(prev => [...prev, newCommentData])
      setNewComment('')
      toast.success('댓글이 등록되었습니다.')
    } catch (error) {
      toast.error('댓글 등록에 실패했습니다.')
    } finally {
      setSubmittingComment(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return <p key={index} className="mb-3 leading-relaxed">{line}</p>
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다</h1>
          <Button onClick={() => navigate({ to: '/posts' })}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <Button 
          variant="outline" 
          onClick={() => navigate({ to: '/posts' })}
          className="mb-6"
        >
          ← 목록으로 돌아가기
        </Button>

        {/* 게시글 내용 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl font-bold leading-tight">
              {post.title}
            </CardTitle>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                작성자: {post.author?.username} • {formatDate(post.createdAt)}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">댓글 ({comments.length})</CardTitle>
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
                disabled={submittingComment}
              />
              <Button 
                onClick={handleSubmitComment}
                disabled={submittingComment || !newComment.trim()}
              >
                {submittingComment ? '등록 중...' : '댓글 등록'}
              </Button>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">
                        {comment.author?.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 