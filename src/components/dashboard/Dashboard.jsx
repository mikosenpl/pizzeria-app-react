import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import useAuth from '../../hooks/useAuth'

const Dashboard = () => {
    const { auth } = useAuth()
    return (
        <Box>
            <Typography variant="h5" element="h2" textAlign="center">
                Witaj {auth.user.name}
            </Typography>
        </Box>
    )
}

export default Dashboard
