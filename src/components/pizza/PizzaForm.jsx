import { SaveIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import useCreatePizza from '../../hooks/useCreatePizza';

export default function PizzaForm() {
    const [newPizza, setNewPizza] = useState({
        name: "",
        description: "",
        bigPrice: 0,
        smallPrice: 0,
    });
    const mutationCreatePizza = useCreatePizza();

    const handleSubmit = e => {
        e.preventDefault();
          
        mutationCreatePizza.mutate(newPizza);

        setNewPizza({
            name: "",
            description: "",
            bigPrice: 0,
            smallPrice: 0,
        });
    };

    return (
        <form className="inline-grid" onSubmit={handleSubmit}>
            <input
                type="text"
                className="rounded-md border-slate-300 shadow-md p-2 mb-2"
                placeholder="Wprowadź nazwę..."
                value={newPizza.name}
                required
                onChange={e => setNewPizza({ ...newPizza, name: e.target.value })}
            />
            <input
                type="text"
                className="rounded-md border-slate-300 shadow-md p-2 mb-2"
                placeholder="Wprowadź składniki.."
                value={newPizza.description}
                required
                onChange={e => setNewPizza({ ...newPizza, description: e.target.value })}
            />
            <input
                type="number"
                step="0.01"
                className="rounded-md border-slate-300 shadow-md p-2 mb-2"
                placeholder="Cena 50cm"
                value={newPizza.bigPrice == 0 ? '' : newPizza.bigPrice}
                required
                onChange={e => setNewPizza({ ...newPizza, bigPrice: parseFloat(e.target.value)})}
            />
            <input
                type="number"
                step="0.01"
                className="rounded-md border-slate-300 shadow-md p-2 mb-2"
                placeholder="Cena 30cm"
                value={newPizza.smallPrice == 0 ? '' : newPizza.smallPrice}
                required
                onChange={e => setNewPizza({ ...newPizza, smallPrice: parseFloat(e.target.value)})}
            />
            <button
                type="submit"
                className="flex items-center justify-center rounded-lg bg-cyan-200 hover:bg-cyan-300 px-4 py-2 text-slate-700 mt-4"
                disabled={mutationCreatePizza.isLoading}
            >
                <SaveIcon className="h-5 w-5 mr-1" />
                <span>Zapisz</span>
            </button>
        </form>
    );
}