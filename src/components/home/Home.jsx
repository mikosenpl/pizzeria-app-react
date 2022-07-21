import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeNav from './HomeNav'

const Home = () => {
    return (
        <>
            <Typography style={{ textAlign: 'center', marginTop: '40vh' }}>Tutaj strona główna hotelu</Typography>
            <Link to="/dashboard" style={{ textAlign: 'center', display: 'block' }}>
                Dashboard
            </Link>
        </>
    )
}

export default Home
