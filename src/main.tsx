import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { SignupPage } from './components/SignupPage'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {/* <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<App />} />
          </Routes>
        </BrowserRouter> */}
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
