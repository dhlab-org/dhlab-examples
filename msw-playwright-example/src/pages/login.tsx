import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePostLoginMutation } from '@/entities/auth/api/mutations';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const [userId, setUserId] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  // 로그인 mutation
  const loginMutation = usePostLoginMutation({
    onSuccess: (user: any) => {
      // 로그인 성공
      localStorage.setItem('userId', userId);
      localStorage.setItem('userInfo', JSON.stringify(user));
      toast.success(`${user.username}님, 환영합니다!`);
      navigate({ to: '/posts' });
    },
    onError: () => {
      // 로그인 실패
      setShowErrorModal(true);
    },
  });

  const handleLogin = async () => {
    if (!userId.trim()) {
      toast.error('사용자 ID를 입력해주세요.');
      return;
    }

    loginMutation.mutate({
      body: { userId: userId.trim() },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">블로그 로그인</CardTitle>
          <CardDescription>
            사용자 ID를 입력하여 로그인하세요
            <br />
            <span className="text-xs text-gray-400 mt-1 block">(예: admin, developer, designer, tester, manager)</span>
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
              disabled={loginMutation.isPending}
            />
          </div>
          <Button className="w-full" onClick={handleLogin} disabled={loginMutation.isPending || !userId.trim()}>
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>로그인 실패</DialogTitle>
            <DialogDescription>
              존재하지 않는 사용자입니다. 올바른 사용자 ID를 입력해주세요.
              <br />
              <span className="text-xs text-gray-500 mt-2 block">
                사용 가능한 ID: admin, developer, designer, tester, manager
              </span>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowErrorModal(false)}>확인</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
