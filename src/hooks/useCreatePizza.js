import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import useNotification from './useNotification';

export default function useCreatePizza() {
    const queryClient = useQueryClient();
    const [success, error] = useNotification();

    return useMutation(data => axios.post('/api/pizzas', data).then(res => res.data), {
        onMutate: newPizza => {
            const oldPizza = queryClient.getQueryData('allPizzaData');

            if (oldPizza) {
                queryClient.setQueryData('allPizzaData', oldPizza => [
                    ...oldPizza,
                    newPizza,
                ]);
                return;
            }

            return () => queryClient.setQueryData('allPizzaData', oldPizza);
        },
        onSettled: () => {
            queryClient.invalidateQueries('allPizzaData');
        },
        onSuccess: () => success(),
        onError: () => error(),
    });
}