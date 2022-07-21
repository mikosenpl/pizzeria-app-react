import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import TodayIcon from '@mui/icons-material/Today'
import HotelIcon from '@mui/icons-material/Hotel'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import MuiAppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import useAuth from '../../hooks/useAuth'
import { ROLE } from '../../constant/roles'
import RouterLink from '../RouterLink'

const drawerWidth = 240

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
})

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

export default function DashboardNav({ roles }) {
    const theme = useTheme()
    const { logout, auth } = useAuth()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <RouterLink to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" noWrap component="div" color="white">
                            Pizzeria
                        </Typography>
                    </RouterLink>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {auth.roles.find((role) => role === ROLE.ADMIN) ? (
                        <RouterLink to="admin">
                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Panel administracyjny" />
                            </ListItem>
                        </RouterLink>
                    ) : null}
                    {auth.roles.find((role) => role === ROLE.RECEPTIONIST) ? (
                        <>
                            <RouterLink to="rooms">
                                <ListItem button>
                                    <ListItemIcon>
                                        <HotelIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Pokoje" />
                                </ListItem>
                            </RouterLink>
                            <RouterLink to="reservations">
                                <ListItem button>
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Rezerwacje" />
                                </ListItem>
                            </RouterLink>
                        </>
                    ) : null}
                    <RouterLink to="checkouts">
                        <ListItem button>
                            <ListItemIcon>
                                <TodayIcon />
                            </ListItemIcon>
                        </ListItem>
                    </RouterLink>
                </List>
                <Divider />
                <List style={{ position: 'absolute', bottom: '0' }}>
                    <RouterLink to="settings">
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ustawienia konta" />
                        </ListItem>
                    </RouterLink>
                    <ListItem button onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Wyloguj" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}
