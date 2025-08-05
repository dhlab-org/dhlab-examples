import './App.css';
import { TestSocketButton } from './socketio/test-socket-button';

function App() {
  return (
    <>
      <h1>Api-recorder 테스트</h1>
      <TestSocketButton />
      <TestHttpFetchButton />
    </>
  );
}

export default App;

const TestHttpFetchButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
          .then(res => res.json())
          .then(data => {
            console.log(data);
          });
      }}
    >
      Test Http Fetch
    </button>
  );
};
