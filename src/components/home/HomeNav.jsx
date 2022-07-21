import styled from '@emotion/styled'
import { Button, Grid, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'


const Nav = styled('nav')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: 15,
}))

const useStyles = makeStyles({
    navContent: {
        maxWidth: '1600px',
        margin: '0 auto',
    },

    button: {
        backgroundColor: 'hsl(100, 50%, 50%)',
    },
    shadow: {
        boxShadow: '#888c91 0px 3px 10px',
    },
    close: {
        padding: '20px',
        textAlign: 'right',
    },
})

const HomeNav = () => {
    const styles = useStyles()
    const [setDrawerOpen] = useState(false)

    const handleDrawer = (open) => {
        setDrawerOpen(open)
    }

    return (
        <Nav className={styles.shadow}>
            <Grid container alignItems="center" className={styles.navContent}>
                <Grid item xs={4}>
                    <Link href="/" underline="none" color="rgb(255,255,255)">
                        <Typography variant="h4" component="h2" style={{ fontWeight: 'bold', letterSpacing: '3px' }}>
                            Hotel - spring
                        </Typography>
                    </Link>
                </Grid>
                <Grid item container spacing={2} alignItems="center" justifyContent="flex-end" xs={8}>
                    <Grid item>
                        <Link href="#" underline="hover" color="white">
                            About
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" underline="hover" color="white">
                            Contact
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" onClick={() => handleDrawer(true)}>
                            Znajdź pokój dla siebie
                        </Button>
                    </Grid>
                </Grid>
                
            </Grid>
        </Nav>
    )
}

export default HomeNav
