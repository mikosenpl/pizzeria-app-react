import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import useNotification from './useNotification';

export default function useDeletePizza() {
    const queryClient = useQueryClient();
    const [success, error] = useNotification();

    return useMutation(Pizza => axios.delete(`/api/pizzas/${Pizza.id}`).then(res => res.data), {
        onSettled: () => {
            queryClient.invalidateQueries('allPizzaData');
        },
        onSuccess: () => success(),
        onError: () => error(),
    });
}