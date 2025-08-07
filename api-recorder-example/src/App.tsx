import { ApiRecorderDevtools } from '@dhlab/api-recorder';
import { FetchTest } from './test-cases/fetch';
import { SocketIOTest } from './test-cases/socketio';
import { XhrTest } from './test-cases/xhr';

function App() {
  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '200px' }}>
        <SocketIOTest />
        <FetchTest />
        <XhrTest />
      </div>
      <ApiRecorderDevtools />
    </>
  );
}

export default App;
