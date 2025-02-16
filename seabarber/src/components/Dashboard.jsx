import { useNavigate } from "react-router-dom";
import { logoutEvent } from "../action/account.action";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Default from "../assets/Default.jpg";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    const navigate = useNavigate();
    const [accountDetail, setAccountDetail] = useState(null);

    function handleBranchDashboard(){
        navigate('/branchDashboard', { state: { user_id : accountDetail.id, full_name: accountDetail.username } });
    }

    function handleReserve(){
        navigate('/reserve', { state: { id, full_name: accountDetail.full_name, phone: accountDetail.phone, role: accountDetail.role } });
    }

    function handleHome(){
        navigate('/', { state: { id: id, full_name: accountDetail.full_name, phone: accountDetail.phone, role: accountDetail.role } });
    }

    function handelReservationList(){
        navigate('/reservationList', { state: { id: id, full_name: accountDetail.full_name, role: accountDetail.role}})
    }

    function handleAdminReservationList(){
        navigate('/reservationList', { state: { id: id, full_name: accountDetail.full_name, role: accountDetail.role}})
    }

    function handleLogOut(){
        const token = localStorage.getItem("jwt")
        localStorage.removeItem("jwt")  
        logoutEvent(token)
        .then(data => {
            toast.success('Successfully Log Out', {
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
                setAccountDetail(null);
                navigate('/login');
            }, 1000)
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

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if(!token){
            navigate('/login')
            return
        }

        try{
            const decode = jwtDecode(token)
            setAccountDetail({
                id: decode.id,
                username: decode.username,
                email: decode.email,
                phone: decode.phone,
                role: decode.role
            });
        }
        catch (error){
            localStorage.removeItem("jwt")
            navigate("/login")
        }
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
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleHome}>Home</li>
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleLogOut}>Log Out</li>
                </ul>
            </nav>
            <main 
                className="h-svh bg-slate-900 bg-center flex justify-center items-center">
                <div className="w-1/4 bg-white rounded-xl flex flex-col justify-center max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12">
                    <div className="flex justify-center items-center mt-8">
                        <img src={Default} alt="Default" className="w-1/3 border-2 border-black rounded-full" />
                    </div>
                    <div className="text-center flex flex-col justify-center max-sm:ml-4">
                        {accountDetail ? (
                            <>
                                <p className="mt-6 text-2xl">{accountDetail.username.slice(0, 15)}</p>
                                    <p className="mt-4 text-2xl">{accountDetail.phone}</p>
                                    <p className="mt-4 text-2xl">{accountDetail.email}</p>
                            </>
                        ) : (
                                <p>Loading...</p>
                        )}
                    </div>
                    <div className="mt-6 mb-8 mx-8 flex flex-col items-center">
                        {accountDetail && accountDetail.role === 'Customer' ? (
                            <>
                                <button 
                                    className="w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                                    onClick={handleReserve}>
                                    Make Reservation
                                </button>
                                <button 
                                    className="mt-4 w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                                    onClick={handelReservationList}>
                                    View Reservation
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    className="mt-4 w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                                    onClick={handleBranchDashboard}>
                                    Manage Branch
                                </button>
                                <button 
                                className="mt-4 w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                                    onClick={handleAdminReservationList}>
                                    View Reservation
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;