import { PlusIcon, MinusIcon, XIcon, ExclamationIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import useDeletePizza from '../../hooks/useDeletePizza';
import useUpdatePizza from '../../hooks/useUpdatePizza';

export default function PizzaInfo({ pizza }) {
    const [showDetail, setShowDetail] = useState(null);
    const mutationUpdatePizza = useUpdatePizza();
    const mutationDeletePizza = useDeletePizza();

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 0) {
            return;
        }

        mutationUpdatePizza.mutate({ id, quantity: newQuantity });
    };

    const handleDelete = id => {
        mutationDeletePizza.mutate({ id });
    };

    return (
        <div className="relative border rounded-lg text-center cursor-pointer transition hover:border-x-cyan-200 hover:border-y-purple-200 hover:shadow-lg">
            <div
                className="p-1"
                onClick={() => setShowDetail(showDetail === pizza.id ? null : pizza.id)}
            >
                <h2 className="text-lg font-bold mb-0">{pizza.name}</h2>
                <small className="block mb-4">{pizza.description}</small>
            </div>
            <div className="border-t flex flex-row">
                <button
                    className="flex items-center justify-center w-1/2 py-2 border-r font-bold transition hover:bg-slate-200"
                >{pizza.bigPrice}
                    
                </button>
                <button
                    className="flex items-center justify-center w-1/2 py-2 font-bold transition hover:bg-slate-200"
                >
                {pizza.smallPrice}
                </button>
            </div>
            {showDetail === pizza.id ? (
                <div className="absolute top-0 left-0 rounded-lg w-full h-full backdrop-blur-md flex flex-col justify-center items-center">
                    <button className="absolute top-1 right-1" onClick={() => setShowDetail(null)}>
                        <XIcon className="h-5 w-5" />
                    </button>
                    <button
                        className="flex items-center justify-center rounded-lg bg-rose-600 text-white font-bold px-4 py-2 transition hover:bg-rose-700 mb-3"
                        disabled={mutationUpdatePizza.isLoading}
                        
                    >
                        <ExclamationIcon className="h-5 w-5 mr-1" />
                        <span>reset</span>
                    </button>
                    <div className="w-full border-t">
                        <button
                            className="flex items-center justify-center rounded-lg bg-yellow-200 font-bold px-4 py-2 transition hover:bg-yellow-300 mx-auto mt-3"
                            disabled={mutationDeletePizza.isLoading}
                            onClick={() => handleDelete(pizza.id)}
                        >
                            <TrashIcon className="h-5 w-5 mr-1" />
                            <span>delete</span>
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}