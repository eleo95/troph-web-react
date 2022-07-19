import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { QueryClientProvider, QueryClient } from 'react-query'
import {ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        {/* <Route path='/test' element={<>test</>} /> */}
        {/* <Route path='game/:gameId' element={<GameDetails />} /> */}
        {/* <Route path='game'>
          <Route path=':gameId' element={<GameDetails />} />
        </Route> */}
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
  </QueryClientProvider>
}

export default App
