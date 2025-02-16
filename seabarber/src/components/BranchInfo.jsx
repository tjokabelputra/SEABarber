import { useNavigate } from "react-router-dom";
import { getAllBranch } from '../action/branch.action';
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function BranchInfo() {
    const navigate = useNavigate();
    const [accountDetail, setAccountDetail] = useState({
        id: '',
        role: ''
    });
    const [allBranch, setAllBranch] = useState([]);

    function handleHome() {
        navigate('/');
    }

    function handleReservation() {
        if (accountDetail.id !== null) {
            navigate('/reserve');
        } else {
            navigate('/login');
        }
    }

    function handleBranchDetail() {
        const token = localStorage.getItem("jwt")
        getAllBranch(token)
            .then(data => {
                setAllBranch(data);
            })
            .catch(error => {
                alert(error);
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
                role: decode.role
            });
        }
        catch (error){
            localStorage.removeItem("jwt")
            navigate("/login")
        }
        handleBranchDetail();
    }, []);

    return (
        <>
            <nav className='flex flex-row justify-around bg-slate-900'>
                <h1 className='text-4xl py-4 text-white max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleHome}>Home</li>
                    {accountDetail.role === 'Customer' &&
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
                                <p className='text-xl text-center max-sm:text-base'><i className='fas fa-door-closed mr-2'></i>{branch.closing_time}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
}

export default BranchInfo;