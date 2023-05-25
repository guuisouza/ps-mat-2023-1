import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'
import PaymentMethodForm from './pages/payment_method/PaymentMethodForm'
import ShipmentPriorityList from './pages/shipment_priority/ShipmentPriorityList'
import ShipmentPriorityForm from './pages/shipment_priority/ShipmentPriorityForm'
import CarrierList from './pages/carrier/CarrierList'
import CarrierForm from './pages/carrier/CarrierForm'

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
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={ <AuthGuard> <Home /> </AuthGuard>}/>
            <Route path="/payment_method" element={<AuthGuard> <PaymentMethodList/> </AuthGuard>}/>
            <Route path="/payment_method/new" element={<AuthGuard> <PaymentMethodForm/> </AuthGuard>}/>
            <Route path="/payment_method/:id" element={<AuthGuard> <PaymentMethodForm/> </AuthGuard>}/>
            <Route path="/shipment_priority" element={<AuthGuard> <ShipmentPriorityList/> </AuthGuard>}/>
            <Route path="/shipment_priority/new" element={<AuthGuard> <ShipmentPriorityForm/> </AuthGuard>}/>
            <Route path="/shipment_priority/:id" element={<AuthGuard> <ShipmentPriorityForm/> </AuthGuard>}/>
            <Route path="/carrier" element={<AuthGuard> <CarrierList/> </AuthGuard>}/>
            <Route path="/carrier/new" element={<AuthGuard> <CarrierForm/> </AuthGuard>}/>
            <Route path="/carrier/:id" element={<AuthGuard> <CarrierForm/> </AuthGuard>}/>
          </Routes>
        </Box>
      </BrowserRouter>
  )
}

export default App
