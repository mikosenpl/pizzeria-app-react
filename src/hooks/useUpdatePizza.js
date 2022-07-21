import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import useNotification from './useNotification';

export default function useUpdatePizza() {
    const [success, error] = useNotification();
    const queryClient = useQueryClient();

    return useMutation(
        updatedPizza =>
            axios
                .put(`/api/pizzas/${updatedPizza.id}`, {
                    quantity: updatedPizza.quantity,
                })
                .then(res => res.data),
        {
            onMutate: updatedPizza => {
                queryClient.setQueryData(['allPizzaData', updatedPizza.id], updatedPizza);
            },
            onSuccess: updatedPizza => {
                queryClient.setQueryData(['allPizzaData', updatedPizza.id], updatedPizza);

                if (queryClient.getQueryData('allPizzaData')) {
                    queryClient.setQueryData('allPizzaData', data => {
                        return data.map(oldPizza => {
                            if (oldPizza.id === updatedPizza.id) {
                                return { ...oldPizza, ...updatedPizza };
                            }

                            return oldPizza;
                        });
                    });
                } else {
                    queryClient.setQueryData('allPizzaData', [updatedPizza]);
                    queryClient.invalidateQueries('allPizzaData');
                }

                success();
            },
            onError: () => error(),
        },
    );
}