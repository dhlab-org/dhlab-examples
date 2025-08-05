import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite 기본 포트
    methods: ["GET", "POST"]
  }
});

const PORT = 64436;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// Socket.IO 연결 처리
io.on('connection', (socket) => {
  console.log('✅ 클라이언트 연결됨:', socket.id);

  socket.onAny((event, ...args) => {
    console.log('📥 서버 수신:', event, args);
  });

  // hello 메시지 핸들러
  socket.on('hello', (message) => {
    console.log('📥 hello 메시지 수신:', message);
    
    // 첫 번째 답장
    socket.emit('response', { 
      message: '안녕하세요! 첫 번째 답장입니다.', 
      timestamp: Date.now() 
    });
    
    // 두 번째 답장 (1초 후)
    setTimeout(() => {
      socket.emit('response', { 
        message: '두 번째 답장입니다!', 
        timestamp: Date.now() 
      });
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('❌ 클라이언트 연결 해제됨:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Express + Socket.IO 서버 시작됨 (port: ${PORT})`);
}); 