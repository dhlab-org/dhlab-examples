import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { toast } from 'sonner'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!userId.trim()) {
      toast.error('사용자 ID를 입력해주세요.')
      return
    }

    setIsLoading(true)
    
    try {
      // 실제 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 임시로 모든 로그인을 성공으로 처리
      localStorage.setItem('userId', userId)
      toast.success('로그인이 성공했습니다!')
      navigate({ to: '/posts' })
    } catch (error) {
      setShowErrorModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">블로그 로그인</CardTitle>
          <CardDescription>
            사용자 ID를 입력하여 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="userId" className="text-sm font-medium">
              사용자 ID
            </label>
            <Input
              id="userId"
              type="text"
              placeholder="사용자 ID를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleLogin} 
            disabled={isLoading || !userId.trim()}
            >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>로그인 실패</DialogTitle>
            <DialogDescription>
              로그인에 실패했습니다. 다시 시도해주세요.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowErrorModal(false)}>
            확인
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
} 