const FetchTest = () => {
  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <p>Fetch 테스트</p>
      <button
        type="button"
        onClick={() => {
          fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => res.json())
            .then(data => {
              console.log(data);
            });
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
        Test Http Fetch
      </button>
    </div>
  );
};

export { FetchTest };
