import { useNavigate } from 'react-router-dom';
import { getAllBranch } from '../action/branch.action';
import { deleteBranch } from '../action/branch.action';
import { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

function BranchDashboard() {
    const navigate = useNavigate();
    const [accountDetail, setAccountDetail] = useState({
        id: '',
        username: ''
    })
    const [allBranch, setAllBranch] = useState([]);

    function handleDashboard() {
        navigate('/dashboard');
    }

    function handleCreateBranch(){
        navigate('/createBranch');
    }

    function handleDeleteBranch(id){
        const token = localStorage.getItem("jwt")
        deleteBranch(token, id)
        .then(() => {
            toast.success('Branch Successfully Deleted', {
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
            setAllBranch(prevBranches => 
                prevBranches.filter(branch => branch.id !== id)
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
        })
    }
    
    function handleEditBranch(id){
        navigate('/editBranch', { state: { branch_id: id } });
    }

    function handleBranchDetail() {
        const token = localStorage.getItem("jwt")
        getAllBranch(token)
            .then(data => {
                setAllBranch(data);
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
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt")
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
            handleBranchDetail();
        }
        catch (error){
            localStorage.removeItem("jwt")
            navigate("/login")
        }
    }, []);

    return (
        <div className='font-body'>
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
                <div className="w-1/2 h-3/5 bg-white rounded-xl flex flex-col justify-center max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12 max-sm:h-3/5">
                    <ul className="mt-4 mx-4 flex overflow-x-auto space-x-4">
                        {allBranch.map((branch, index) => (
                            <li key={index} className='max-w-[300px] px-4 py-4 flex-shrink-0 flex flex-col border-2 border-black rounded-xl'>
                                <p className='text-2xl text-center max-sm:text-xl'>{branch.name}</p>
                                <p className='mt-1 text-l max-sm:text-sm'><i className='fas fa-map mr-2 text-xl max-sm:text-sm'></i>{branch.location}</p>
                                <p className='mt-1 text-xl text-center max-sm:text-base'><i className='fas fa-door-open mr-2 text-xl max-sm:text-sm'></i>{branch.open_time}</p>
                                <p className='mt-1 text-xl text-center max-sm:text-base'><i className='fas fa-door-closed mr-2 text-xl max-sm:text-sm'></i>{branch.closing_time}</p>
                                <div className="mt-2 flex flex-col items-center">
                                    <button 
                                        className="w-full px-2 py-2 text-xl border-2 bg-green-600 text-white border-black rounded-xl max-sm:text-base max-sm:py-2"
                                        onClick={() => handleEditBranch(branch.id, branch)}>
                                        Edit
                                    </button>
                                    <button 
                                        className="w-full mt-4 px-2 py-2 text-xl bg-red-600 text-white border-2 border-black rounded-xl max-sm:text-base"
                                        onClick={() => handleDeleteBranch(branch.id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="my-8 flex flex-col items-center">
                        <button 
                            className="w-1/2 px-4 py-4 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base max-sm:py-2"
                            onClick={handleCreateBranch}>
                            Add Branch
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BranchDashboard;