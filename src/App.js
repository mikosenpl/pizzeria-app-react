import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/home/Home'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'
import Unauthorized from './components/Unauthorized'
import { ROLE } from './constant/roles'
import { useTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import DashboardLayout from './components/dashboard/DashboardLayout'
import { SnackbarProvider } from 'notistack'

function App() {
    const theme = useTheme()
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <SnackbarProvider maxSnack={3}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="unauthorized" element={<Unauthorized />} />
                        <Route path="/dashboard" element={<DashboardLayout />}/>
                        <Route path="" element={<Dashboard />} />
                        <Route path="*" element={<div> Not found </div>} />
                    </Routes>
                </SnackbarProvider>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default App
