import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserReservation } from "../action/reservation.action";
import { deleteReservation } from "../action/reservation.action";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReservationList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userReservation, setUserReservation] = useState([]);
    const { id, full_name } = location.state || {};

    function handleDashboard() {
        navigate('/dashboard', { state: { id: id } });
    }

    function handleEditReservation(order_id) {
        navigate('/editReservation', { state: {id, r_id: order_id, full_name}})
    }

    function handleDeleteReservation(order_id){
        deleteReservation(order_id)
        .then(() => {
            toast.success('Reservation Successfully Canceled', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setUserReservation(prevReservations => 
                prevReservations.filter(reservation => reservation.order_id !== order_id)
            );
        })
        .catch(error => {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        });
    }

    function handleUserReservation() {
        getUserReservation(id)
            .then(data => {
                setUserReservation(data);
            })
            .catch(error => {
                alert(error);
            });
    }

    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { formattedDate, formattedTime };
    }

    useEffect(() => {
        handleUserReservation();
    }, []);

    return (
        <div className="font-body">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <nav className='flex flex-row justify-around bg-slate-900'>
                <h1 className='text-4xl py-4 text-white max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleDashboard}>{full_name}</li>
                </ul>
            </nav>
            <main className="h-svh bg-slate-900 bg-center flex justify-center items-center">
                <div className="w-1/2 h-1/2 bg-white rounded-xl flex overflow-x-auto hide-scrollbar max-xl:w-4/5 max-sm:h-3/5">
                    <ul className="flex flex-row gap-4 p-4">
                        {userReservation.map((reservation, index) => {
                            const { formattedDate, formattedTime } = formatDateTime(reservation.dateandtime);
                            return (
                                <li key={index} className='max-w-[250px] p-2 border-2 border-black rounded-xl shadow-md bg-gray-100 flex flex-col justify-center m-2'>
                                    <p className='text-2xl text-center max-sm:text-xl'><i className='fas fa-book mr-2'></i>{reservation.service}</p>
                                    <p className='mt-1 text-2xl text-center max-sm:text-xl'><i className='fas fa-map-marker-alt mr-2'></i>{reservation.branch_name}</p>
                                    <p className='mt-1 text-2xl text-center max-sm:text-xl'><i className='fas fa-calendar mr-4'></i>{formattedDate}</p>
                                    <p className='mt-1 text-2xl text-center max-sm:text-xl'><i className='fas fa-clock mr-4'></i>{formattedTime}</p>
                                    <div className="mt-2">
                                        <button className="w-full py-2 text-lg bg-slate-900 text-white border-2 border-black rounded-xl"
                                            onClick={() => handleEditReservation(reservation.order_id)}>
                                            Edit Reservation
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <button className="w-full py-2 text-lg bg-red-600 text-white border-2 border-red-600 rounded-xl"
                                            onClick={() => handleDeleteReservation(reservation.order_id)}>
                                            Cancel
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default ReservationList;