import { useNavigate, useLocation } from "react-router-dom";
import { getAccountInfo } from "../action/account.action";
import { logoutEvent } from "../action/account.action";
import { useState, useEffect } from "react";
import Salon from "../assets/Salon.jpg"
import Default from "../assets/Default.jpg";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [accountDetail, setAccountDetail] = useState(null);
    const { id } = location.state || {};

    function handleUserDetail(){
        getAccountInfo(id)
        .then(data => {
            setAccountDetail(data);
        })
        .catch(error => {
            alert(error);
        })
    }

    function handleBranchDashboard(){
        navigate('/branchDashboard', { state: { user_id : id, full_name: accountDetail.full_name } });
    }

    function handleReserve(){
        navigate('/reserve', { state: { id, full_name: accountDetail.full_name, phone: accountDetail.phone, role: accountDetail.role } });
    }

    function handleLogOut(){
        const logoutInfo = {full_name:accountDetail.full_name, email:accountDetail.email, phone:accountDetail.phone, password:accountDetail.password}  
        logoutEvent(id, logoutInfo)  
        .then(data => {
            setAccountDetail(null);
            alert(data.message);
            navigate('/login');
        })
        .catch(error => {
            alert(error);
        });
    }

    function handleHome(){
        navigate('/', { state: { id: id, full_name: accountDetail.full_name, phone: accountDetail.phone, role: accountDetail.role } });
    }

    useEffect(() => {
        if(id){
            handleUserDetail();
        }
        else{
            navigate('/login');
        }
    }, [id]);

    return (
        <div className="font-body">
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
                                <p className="mt-6 text-2xl">{accountDetail.full_name.slice(0, 15)}</p>
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
                                    onClick={null}>
                                    View Reservation
                                </button>
                            </>
                        ) : (
                            <button 
                                className="py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                                onClick={handleBranchDashboard}>
                                Manage Branch
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;