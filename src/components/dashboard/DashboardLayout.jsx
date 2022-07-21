import { Box } from '@mui/system'
import { Outlet } from 'react-router'
import useAuth from '../../hooks/useAuth'
import DashboardNav, { DrawerHeader } from './DashboardNav'
import Pizza from '../pizza/Pizza'

const DashboardLayout = () => {
    const { auth } = useAuth()

    return (
        
        <Box sx={{ display: 'flex' }}>
            <DashboardNav roles={auth.roles} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                    <Pizza/>
                <Outlet />
            </Box>
        </Box>
    )
}

export default DashboardLayout
