import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'

//Protect routes
function AuthGuard({children}) {
  //Autenticado apenas se tiver um token gravado no local storage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App() {

  return (
      <BrowserRouter>
        <HeaderBar />
        <Box sx={{ m:'25px auto', p: '25px'}}>
          <Routes>
            <Route path="/" element={ <AuthGuard> <Home /> </AuthGuard>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/payment_method" element={<AuthGuard> <PaymentMethodList/> </AuthGuard>}/>
          </Routes>
        </Box>
      </BrowserRouter>
  )
}

export default App
