import { useNavigate, useLocation } from "react-router-dom";
import { getAllBranch } from '../action/branch.action';
import { useState, useEffect } from "react";

function BranchInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [allBranch, setAllBranch] = useState([]);
    const { id, full_name, phone, role } = location.state || {};

    function handleHome() {
        navigate('/', { state: { id, full_name, phone, role } });
    }

    function handleReservation() {
        if (id !== null) {
            navigate('/reserve', { state: { id, full_name, phone, role } });
        } else {
            navigate('/login');
        }
    }

    function handleBranchDetail() {
        getAllBranch()
            .then(data => {
                setAllBranch(data);
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        handleBranchDetail();
    }, []);

    return (
        <>
            <nav className='flex flex-row justify-around bg-slate-900'>
                <h1 className='text-4xl py-4 text-white max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleHome}>Home</li>
                    {role === 'Customer' &&
                        <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleReservation}>Reservation</li>
                    }
                </ul>
            </nav>

            <main
                className="h-svh bg-slate-900 bg-center flex justify-center items-center">
                <div className="w-1/2 h-1/2 bg-white rounded-xl flex flex-col overflow-y-auto max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12 max-sm:h-3/5">
                    <ul className="my-4 mx-4 space-y-4">
                        {allBranch.map((branch, index) => (
                            <li key={index} className='px-4 py-4 border-2 border-black rounded-xl shadow-md bg-gray-50'>
                                <p className='mb-2 text-2xl text-center max-sm:text-xl'>{branch.name}</p>
                                <p className='mb-2 text-xl max-sm:text-sm'><i className='fas fa-map-marker-alt mr-2'></i>{branch.location}</p>
                                <p className='mb-2 text-xl text-center max-sm:text-base'><i className='fas fa-door-open mr-2'></i>{branch.open_time}</p>
                                <p className='text-xl text-center max-sm:text-base'><i className='fas fa-door-closed mr-2'></i>{branch.close_time}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default BranchInfo;