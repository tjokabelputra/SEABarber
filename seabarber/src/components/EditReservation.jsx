import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReservationById, updateReservation } from "../action/reservation.action";
import { getAllBranch } from "../action/branch.action";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';

function EditReservation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [accountDetail, setAccountDetail] = useState({
        id: '',
        username: ''
    });
    const [allBranch, setAllBranch] = useState([]);
    const [reservation, setReservation] = useState({
        service: 'Haircut and Styling',
        branch_id: '',
        date: '',
        time: '',
        dateandtime: '',
    });
    const [branchInfo, setBranchInfo] = useState({name:'', open: '', close: '' });
    const { r_id } = location.state || {};

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
            });
            handleGetAllBranch()
            handleGetReservation();
        }
        catch (error){
            localStorage.removeItem("jwt")
            navigate("/login")
        }
    }, []);

    useEffect(() => {
        if (allBranch.length > 0 && reservation.branch_id) {
            const selectedBranch = allBranch.find(branch => branch.id === reservation.branch_id);
            if (selectedBranch) {
                setBranchInfo({
                    name: selectedBranch.name,
                    open: selectedBranch.open_time,
                    close: selectedBranch.closing_time
                });
            }
        }
    }, [allBranch, reservation.branch_id]);

    function handleGetReservation() {
        const token = localStorage.getItem("jwt")
        getReservationById(token, r_id)
            .then(data => {
                const dateTime = new Date(data.reservation_time);
                const formattedDate = dateTime.toISOString().split('T')[0];
                const formattedTime = dateTime.toTimeString().slice(0, 5);

                setReservation({
                    ...data,
                    date: formattedDate,
                    time: formattedTime
                });
            })
            .catch(error => {
                alert(error);
            });
    }
    
    function handleGetAllBranch() {
        const token = localStorage.getItem("jwt")
        getAllBranch(token)
            .then(data => {
                setAllBranch(data);
            })
            .catch(error => {
                alert(error);
            });
    }

    function handleDashboard() {
        navigate('/dashboard');
    }

    const handleUpdateReservation = () => {
        const time = reservation.time;
        const selectedDateTime = new Date(`${reservation.date}T${time}`);
    
        const selectedBranch = allBranch.find(branch => branch.id === reservation.branch_id);
    
        if (!selectedBranch) {
            alert('Please select a valid branch.');
            return;
        }
    
        const openTime = new Date(`${reservation.date}T${selectedBranch.open_time}`);
        const closeTime = new Date(`${reservation.date}T${selectedBranch.closing_time}`);
        const adjustedCloseTime = new Date(closeTime.getTime() - 3600000);
    
        if (selectedDateTime < openTime || selectedDateTime > adjustedCloseTime) {
            alert('Sorry, the store is closed at that time.');
            return;
        }
    
        const formattedDateTime = dateFormatter(reservation.date, reservation.time);
    
        if (formattedDateTime) {
            const updatedReservation = {
                ...reservation,
                dateandtime: formattedDateTime,
            };

            const token = localStorage.getItem("jwt")
            
            updateReservation(token, r_id, updatedReservation)
                .then(() => {
                    toast.success('Reservation Changed Successfully', {
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
                        navigate('/reservationList');
                    }, 1000);
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
        else {
            console.error('Failed to format date and time');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedReservation = {
            ...reservation,
            [name]: value,
        };
        setReservation(updatedReservation);

        if (name === 'branch_id') {
            const selectedBranch = allBranch.find(branch => branch.id === Number(value));
            if (selectedBranch) {
                setBranchInfo({
                    name: selectedBranch.name,
                    open: selectedBranch.open_time,
                    close: selectedBranch.closing_time
                });
            }
        }
    };

    const dateFormatter = (date, time) => {
        const [hours, minutes] = time.split(':');
        const dateTimeString = `${date}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
        const dateTime = new Date(dateTimeString);
    
        if (isNaN(dateTime.getTime())) {
            console.error('Invalid date-time format:', dateTimeString);
            return null;
        }

        const isoString = `${dateTime.getFullYear()}-${String(dateTime.getMonth() + 1).padStart(2, '0')}-${String(dateTime.getDate()).padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;
    
        return isoString;
    };

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
                <div className="w-1/4 bg-white rounded-xl flex flex-col justify-center max-2xl:w-3/5 max-lg:w-3/5 max-sm:w-11/12">
                    <h1 className="mt-8 text-4xl text-center">Edit Reservation</h1>
                    <p className="mt-2 text-xl text-center font-semibold">Each Session 1 Hour</p>
                    <p className="mt-2 text-xl text-center font-semibold">{branchInfo.name}: {branchInfo.open} - {branchInfo.close}</p>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="service" className='mr-4 text-xl max-sm:text-base'>Branch</label>
                        <select
                            id="service"
                            name="branch_id"
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.branch_id || ''}
                            onChange={handleChange}
                        >
                            {allBranch.map((branch) => (
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="service" className='mr-4 text-xl max-sm:text-base'>Service</label>
                        <select 
                            id="service" 
                            name="service" 
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.service}
                            onChange={handleChange}
                        >
                            <option value="Haircut and Styling">Haircut and Styling</option>
                            <option value="Manicure and Pedicure">Manicure and Pedicure</option>
                            <option value="Facial Treatments">Facial Treatments</option>
                        </select>
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="date" className='mr-4 text-xl max-sm:text-base'>Date</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date" 
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 mx-8 flex flex-col">
                        <label htmlFor="time" className='mr-4 text-xl max-sm:text-base'>Time</label>
                        <input 
                            type="time" 
                            id="time" 
                            name="time" 
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-6 mb-8 mx-8 flex flex-col items-center">
                        <button 
                            className="w-full py-2 bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                            onClick={handleUpdateReservation}
                        >
                            Update Reservation
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditReservation;