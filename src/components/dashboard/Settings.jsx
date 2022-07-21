import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px auto',
        gap: '10px',

        '& > *': {
            width: '50%',
        },
    },
})

const Settings = () => {
    const styles = useStyles()
    const { auth } = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const { isLoading, mutate } = useMutation(updatePassword)
    const {
        register,
        handleSubmit,
        formState: { errors: fieldErrors },
    } = useForm()

    const onSubmit = (formData) => {
        const request = {
            ...formData,
        }
        mutate(request)
    }

    async function updatePassword(request) {
        try {
            await axios.post('users/changePassword', { ...request, id: auth.user.id })
            enqueueSnackbar('Hasło zostało zmienione', { variant: 'success' })
        } catch (e) {
            if (e.response?.data?.message) {
                enqueueSnackbar(e.response.data.message, { variant: 'error' })
            } else {
                enqueueSnackbar('Nie udało się zmienić, spróbuj ponownie później', { variant: 'error' })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Typography textAlign="center" variant="h6">
                Zmień hasło
            </Typography>
            <TextField
                required
                type="password"
                {...register('oldPassword', { minLength: 6, maxLength: 50 })}
                error={fieldErrors.oldPassword ? true : false}
                helperText={fieldErrors.oldPassword ? 'Musi zawierać od 6 do 50 znaków' : null}
                label="Obecne hasło"
            />
            <TextField
                required
                type="password"
                {...register('password', { minLength: 6, maxLength: 50 })}
                error={fieldErrors.password ? true : false}
                helperText={fieldErrors.password ? 'Musi zawierać od 6 do 50 znaków' : null}
                label="Nowe hasło"
            />

            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress /> : 'Aktualizuj'}
            </Button>
        </form>
    )
}

export default Settings
