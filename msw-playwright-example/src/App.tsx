import { useState } from 'react'
import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center items-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={viteLogo}
              className="h-24 w-24 hover:scale-110 transition-transform duration-300"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={reactLogo}
              className="h-24 w-24 hover:scale-110 transition-transform duration-300 animate-spin"
              alt="React logo"
            />
          </a>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Vite + React + TypeScript
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            type="button"
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Count is {count}
          </button>

          <p className="mt-6 text-gray-600">
            Edit{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              src/App.tsx
            </code>{' '}
            and save to test HMR
          </p>
        </div>

        <p className="mt-8 text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
