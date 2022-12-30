import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { QueryClientProvider, QueryClient } from 'react-query'
// import {ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
    {/* <div className='w-full h-5 bg-red-500 sm:bg-orange-500 md:bg-amber-500 lg:bg-green-500 xl:bg-blue-500  text-center top-0 mb-2 pb-2'>DEMO: stale-time cache: unlimited</div> */}
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
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> */}
  </QueryClientProvider>
}

export default App
