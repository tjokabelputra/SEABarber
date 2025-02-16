import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllReservation } from "../action/reservation.action";
import { getUserReservation } from "../action/reservation.action";
import { deleteReservation } from "../action/reservation.action";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';

function ReservationList() {
    const navigate = useNavigate();
    const [accountDetail, setAccountDetail] = useState({
        id: '',
        username: '',
        role: ''
    });
    const [userReservation, setUserReservation] = useState([]);
    const [displayedReservation, setDisplayedReservation] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    function handleDashboard() {
        navigate('/dashboard');
    }

    function handleEditReservation(id) {
        navigate('/editReservation', { state: { r_id: id }})
    }

    function handleDeleteReservation(id){
        const token = localStorage.getItem("jwt")
        deleteReservation(token, id)
        .then(() => {
            toast.success( accountDetail.role === "Admin" ? 'Reservation Completed' :'Reservation Successfully Canceled', {
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
            handleUserReservation()
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
        const token = localStorage.getItem("jwt");
    
        console.log("User role on function call:", accountDetail.role);
    
        const fetchReservations = accountDetail.role == "Admin"
            ? () => getAllReservation(token)
            : () => getUserReservation(token);
    
        console.log("Fetching reservations using:", accountDetail.role == "Admin" ? "getAllReservation" : "getUserReservation");
    
        fetchReservations()
            .then(data => {
                console.log("Fetched data:", data);
    
                if (!data || data.length === 0) {
                    throw new Error("No reservations available.");
                }
                
                setUserReservation(data);
                setDisplayedReservation(data);
            })
            .catch(error => {
                console.error("Error fetching reservations:", error);
                setUserReservation([]);
                setDisplayedReservation([]);
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
    

    function handleSearch() {
        setDisplayedReservation(userReservation)
        setDisplayedReservation(prevReservations => 
            prevReservations.filter(reservation => 
                reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }

    function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { formattedDate, formattedTime };
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt");
            if(!token){
                navigate('/login')
                return
            }        
            try{
                const decode = jwtDecode(token)
                const currentTime = Date.now() / 1000
                if (decode.exp < currentTime) {
                    localStorage.removeItem("jwt");
                    toast.error("Session Expired", {
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
        
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                    return;
                }
                setAccountDetail({
                    id: decode.id,
                    username: decode.username,
                    role: decode.role
                });
            }
            catch (error){
                localStorage.removeItem("jwt")
                navigate("/login")
            }
    }, [navigate]);

    useEffect(() => {
        if(accountDetail.role){
            handleUserReservation()
        }
    }, [accountDetail.role])

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
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleDashboard}>{accountDetail.username}</li>
                </ul>
            </nav>
            <main className="h-svh bg-slate-900 bg-center flex justify-center items-center">
                <div className="w-1/2 h-1/2 bg-white rounded-xl flex flex-col max-xl:w-4/5 max-sm:h-3/5 p-4">
                    {accountDetail.role === "Admin" && (
                        <div className="mt-2 mb-2">
                            <input 
                                type="text" 
                                placeholder="Search by name" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="w-2/5 mx-2 text-xl px-2 py-2 border-2 border-black rounded-lg max-sm:px-1 max-sm:w-3/5"
                            />
                            <button 
                                onClick={handleSearch} 
                                className="bg-slate-900 text-white px-4 py-2 rounded-md ml-2"
                            >
                                Search
                            </button>
                        </div>
                    )}
                    <ul className="flex flex-row gap-4 overflow-x-auto space-x-4">
                        {displayedReservation.map((reservation, index) => {
                            const { formattedDate, formattedTime } = formatDateTime(reservation.reservation_time);
                            return (
                                <li key={index} className='min-w-[250px] p-2 border-2 border-black rounded-xl shadow-md bg-gray-100 flex flex-col justify-center m-2'>
                                    <p className='mt-4 text-2xl text-center max-sm:text-xl'><i className='fas fa-book mr-2'></i>{reservation.service}</p>
                                    <p className='mt-4 text-2xl text-center max-sm:text-xl'><i className='fas fa-map-marker-alt mr-2'></i>{reservation.branch_name}</p>
                                    <p className='mt-4 text-2xl text-center max-sm:text-xl'><i className='fas fa-calendar mr-4'></i>{formattedDate}</p>
                                    <p className='mt-4 text-2xl text-center max-sm:text-xl'><i className='fas fa-clock mr-4'></i>{formattedTime}</p>
                                    <div className="mt-6">
                                        {accountDetail.role === "Customer" && (
                                            <button 
                                                className="w-full py-2 text-lg bg-slate-900 text-white border-2 border-black rounded-xl"
                                                onClick={() => handleEditReservation(reservation.id)}
                                            >
                                                Edit Reservation
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <button 
                                            className={`w-full py-2 text-lg text-white border-2 rounded-xl ${
                                                accountDetail.role === "Admin" 
                                                    ? "bg-green-600 border-green-600" 
                                                    : "bg-red-600 border-red-600"
                                            }`}
                                            onClick={() => handleDeleteReservation(reservation.id)}
                                        >
                                            {accountDetail.role === "Admin" ? "Done" : "Cancel"}
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
