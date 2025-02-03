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
        <>
            <nav className='flex flex-row justify-around bg-'>
                <h1 className='text-4xl py-4 text-black max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleHome}>Home</li>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleLogOut}>Log Out</li>
                </ul>
            </nav>
            <main 
                className="h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${Salon})`, opacity: 0.80 }}
            >
                <div className="w-1/4 h-2/5 bg-white rounded-xl flex flex-col justify-center max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12">
                    <div className="mx-12 my-12 flex flex-row max-sm:mx-6 max-sm:my-6">
                        <img src={Default} alt="Default" className="w-1/3 border-2 border-black rounded-full"/>
                        <div className="ml-6 flex flex-col justify-center max-sm:ml-4">
                            {accountDetail ? (
                                <>
                                    <p className="mb-2 text-2xl max-sm:text-xl">{accountDetail.full_name.slice(0, 15)}</p>
                                    <p className="text-xl max-sm:text-base">{accountDetail.phone}</p>
                                    <p className="mt-2 text-xl max-sm:text-base">{accountDetail.email}</p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 mb-4 flex flex-col items-center">
                        {accountDetail && accountDetail.role === 'Customer' ? (
                            <button 
                                className="w-1/2 px-4 py-4 text-xl border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base max-sm:py-2"
                                onClick={handleReserve}>
                                Make Reservation
                            </button>
                        ) : (
                            <button 
                                className="w-1/2 px-4 py-4 text-xl border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base max-sm:py-2"
                                onClick={handleBranchDashboard}>
                                Manage Branch
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;