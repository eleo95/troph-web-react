import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Login from './pages/Login'
import {UserContextProvider} from './contexts/CurrentUser'
// import {ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const queryClient = new QueryClient()

  return <UserContextProvider>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Dashboard />} />
      </Routes>
    </Router>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> */}
  </QueryClientProvider>
  </UserContextProvider>
}

export default App
