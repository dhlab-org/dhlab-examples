import axios from 'axios';

const XhrTest = () => {
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <p>Xhr 테스트 (Axios)</p>
      <button
        type="button"
        onClick={() => {
          axios
            .get('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => {
              console.log(res);
            })
            .catch(() => {});
        }}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Test Xhr
      </button>
    </div>
  );
};

export { XhrTest };
