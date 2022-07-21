import axios from 'axios';
import { useQuery } from 'react-query';

export default function usePizzaData() {
    return useQuery('allPizzaData', () => axios.get('/api/pizzas').then(res => res.data));
}