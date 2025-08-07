import { useState } from 'react';
import { io } from 'socket.io-client';

const SocketIOTest = () => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleStart = () => {
    if (socket) return;

    const newSocket = io(`http://localhost:64436`);

    newSocket.on('connect', () => {
      console.log('✅ 클라이언트 소켓 연결됨');
      setIsConnected(true);
    });

    newSocket.on('response', data => {
      console.log('📥 응답 수신:', data);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ 클라이언트 소켓 연결 해제됨');
      setIsConnected(false);
    });

    setSocket(newSocket);
  };

  const handleSendMessage = () => {
    if (socket && isConnected) {
      console.log('📤 hello 메시지 전송');
      socket.emit('hello', 'hello');
    }
  };

  const handleClose = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <p>Socket io 테스트</p>
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={handleStart}
          style={{
            marginRight: '10px',
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            opacity: isConnected || socket ? 0.5 : 1,
            cursor: 'pointer',
          }}
          disabled={isConnected || socket}
        >
          Start
        </button>
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!isConnected && !socket}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: isConnected ? '#2196F3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            opacity: !isConnected && !socket ? 0.5 : 1,
            cursor: 'pointer',
          }}
        >
          Send Message
        </button>
        <button
          type="button"
          onClick={handleClose}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            opacity: !isConnected && !socket ? 0.5 : 1,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>연결 상태: </strong>
        <span style={{ color: isConnected ? '#4CAF50' : '#f44336' }}>{isConnected ? '연결됨' : '연결 안됨'}</span>
      </div>
    </div>
  );
};

export { SocketIOTest };
