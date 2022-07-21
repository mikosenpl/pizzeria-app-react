import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import { style } from '@mui/system'
import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import { useMutation } from 'react-query'

const LOGIN_URL = '/login'

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            
            
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: 'linear-gradient(10deg, C0C0C0 30%, #808080 90%)',
            border: 0,
            borderRadius: '10vh',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            padding:'5vh',
            

            
        },
    })
)

function parseJWT(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

const LoginForm = () => {
    const styles = useStyles()
    const { isLoading, mutate } = useMutation(login)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const userRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    const urlFrom = location.state?.from?.pathname || '/'

    const { setAuth } = useAuth()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [email, password])

    const handleUserInput = ({ target }) => {
        setEmail(target.value)
    }

    const handlePasswordInput = ({ target }) => {
        setPassword(target.value)
    }

    async function login(request) {
        setErrorMessage('')
        try {
            const response = await axios.post(LOGIN_URL, request)

            const accessToken = response.data.token
            console.log(accessToken)
            let user = response.data?.user
            if (!user) {
                const { data } = await axios.get(`/users/email/${email}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                user = data
            }
            const roles = user.roles.map((role) => role.name)
            const auth = { user, roles, accessToken }
            localStorage.setItem('auth', JSON.stringify(auth))
            setAuth(auth)
            navigate(urlFrom, { replace: true })
        } catch (e) {
            console.log(e)
            setErrorMessage('Niepoprawny email lub hasło')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        mutate({
            email,
            password,
        })
    }

    return (
        <Grid container justifyContent="center" alignItems="center" className={styles.container}>
            <Grid item md={5} xs={1}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Typography variant="h4" fontWeight="bolder">
                        Logowanie
                    </Typography>
                    <TextField
                        required
                        label="Email"
                        ref={userRef}
                        type="text"
                        value={email}
                        onChange={handleUserInput}
                    />
                    <TextField required label="Hasło" type="password" value={password} onChange={handlePasswordInput} />
                    <Button type="submit" variant="contained" disabled={isLoading}>
                        {isLoading ? <CircularProgress /> : 'Zaloguj'}
                    </Button>
                    <p>{errorMessage}</p>
                </form>
                
            </Grid>
        </Grid>
    )
}

export default LoginForm
