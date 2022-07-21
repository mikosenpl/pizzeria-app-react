import { UserAddIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import PizzaForm from './PizzaForm';
import PizzaInfo from './PizzaInfo';
import usePizzaData from '../../hooks/usePizzaData';

const Pizza = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const { isLoading, isError, data } = usePizzaData();

    return (
        <>
            <div className="text-center py-6 mb-5">
                <h1 className="font-bold text-4xl text-transparent bg-clip-text text-[#3e6595]">
                    Dodawanie nowej pizzy
                </h1>
            </div>
            <div className="md:container md:mx-auto mb-5 px-2">
                <div className="flex flex-col justify-center text-center mb-5 mx-auto md:w-1/3">
                    <button
                        className="flex items-center justify-center rounded-lg bg-cyan-200 hover:bg-cyan-300 px-4 py-2 text-slate-700"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        <UserAddIcon className="h-5 w-5 mr-1" />
                        <span>Dodaj</span>
                    </button>
                    {showAddForm && (
                        <div className="mt-4 rounded-lg p-4 bg-slate-100">
                            <PizzaForm />
                        </div>
                    )}
                </div>
                {isLoading && (
                    <div className="text-center">
                        <strong>Loading...</strong>
                    </div>
                )}
                {isError && (
                    <div className="text-center">
                        <strong>Error!</strong>
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {data &&
                        data.length > 0 &&
                        data.map((p, i) => <PizzaInfo key={i} pizza={p} />)
                        }
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default Pizza;