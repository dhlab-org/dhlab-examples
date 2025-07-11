import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/shared/ui/pagination'
import type { PostDto } from '@/shared/api/dto'

export const Route = createFileRoute('/posts/')({
  component: PostsListComponent,
})

// 임시 데이터 (실제로는 API에서 가져옴)
const mockPosts: PostDto[] = Array.from({ length: 25 }, (_, i) => ({
  id: `post-${i + 1}`,
  title: `블로그 포스트 제목 ${i + 1}`,
  content: `이것은 블로그 포스트 ${i + 1}의 내용입니다. 여기에는 흥미로운 내용이 들어있습니다.`,
  userId: `user-${Math.floor(Math.random() * 5) + 1}`,
  status: Math.random() > 0.5 ? 'PUBLISHED' : 'DRAFT' as const,
  tags: [`태그${i % 3 + 1}`, `카테고리${i % 2 + 1}`],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  author: {
    id: `user-${Math.floor(Math.random() * 5) + 1}`,
    username: `사용자${Math.floor(Math.random() * 5) + 1}`,
    email: `user${Math.floor(Math.random() * 5) + 1}@example.com`,
  }
}))

function PostsListComponent() {
  const [posts, setPosts] = useState<PostDto[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const postsPerPage = 10
  const totalPages = Math.ceil(mockPosts.length / postsPerPage)
  
  useEffect(() => {
    // 로그인 체크
    const userId = localStorage.getItem('userId')
    if (!userId) {
      navigate({ to: '/login' })
      return
    }
    
    // 데이터 로드 시뮬레이션
    const loadPosts = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const startIndex = (currentPage - 1) * postsPerPage
      const endIndex = startIndex + postsPerPage
      const currentPosts = mockPosts
        .filter(post => post.status === 'PUBLISHED')
        .slice(startIndex, endIndex)
      
      setPosts(currentPosts)
      setLoading(false)
    }
    
    loadPosts()
  }, [currentPage, navigate])
  
  const handlePostClick = (postId: string) => {
    navigate({ to: `/posts/${postId}` })
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
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
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">블로그 포스트</h1>
          <p className="text-gray-600">최신 게시글들을 확인해보세요</p>
        </div>
        
        <div className="grid gap-6 mb-8">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handlePostClick(post.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      작성자: {post.author?.username} • {formatDate(post.createdAt)}
                    </CardDescription>
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
                <p className="text-gray-700 line-clamp-3">
                  {post.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page)
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
} 