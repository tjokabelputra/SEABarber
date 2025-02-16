import { useNavigate } from 'react-router-dom';
import { createBranch } from '../action/branch.action';
import { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';

function CreateBranch(){
    const navigate = useNavigate();
    const [newBranch, setNewBranch] = useState({
        name: '',
        location: '',
        open_time: '',
        closing_time: ''
    })

    function handleBranchDashboard(){
        navigate('/branchDashboard');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'open_time' || name === 'closing_time') {
            formattedValue = `${value}:00`;
        }

        setNewBranch({
            ...newBranch,
            [name]: formattedValue,
        });
    };

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
        }
        catch (error){
            localStorage.removeItem("jwt")
            navigate("/login")
        }
    }, []);

    const handleCreateBranch = () => {
        const token = localStorage.getItem("jwt")
        createBranch(token, newBranch)
        .then(() => {
            toast.success('Branch Successfully Created', {
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
            navigate('/branchDashboard');
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
        })
    }

    return(
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
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleBranchDashboard}>Branch List</li>
                </ul>
            </nav>
            <main className='h-svh bg-slate-900 bg-center flex justify-center items-center'>
                <div className="w-1/4 bg-white rounded-xl flex flex-col justify-center max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12">
                    <h1 className="mt-8 text-3xl text-center max-sm:text-2xl">Add Branch</h1>
                    <div className='mt-6 mx-8 flex flex-col'>
                        <label htmlFor="name" className='mr-4 text-xl max-sm:text-base'>Branch Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Branch Name" 
                            value={newBranch.name}
                            onChange={handleChange}
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg max-sm:text-sm'
                        />
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="location" className='mr-4 text-xl max-sm:text-base'>Branch Location</label>
                        <textarea 
                            name="location"
                            placeholder='Branch Location' 
                            value={newBranch.location}
                            onChange={handleChange}
                            className='px-2 py-2  h-32 text-xl border-2 border-black rounded-lg'/>
                    </div>
                    <div className='mt-4 mx-8 flex flex-row items-center max-sm:ml-4 max-sm:mr-8 max-sm:mt-2'>
                        <label htmlFor="open_time" className='text-xl mr-4 max-sm:text-base max-sm:mr-1'>Open</label>
                        <input 
                            type="time" 
                            id="open_time" 
                            name="open_time" 
                            value={newBranch.open_time}
                            onChange={handleChange}
                            className='w-2/5 px-2 py-2 border-2 border-black rounded-lg max-sm:px-1'
                        />
                        <label htmlFor="closing_time" className='text-xl ml-4 mr-4 max-sm:text-base max-sm:mr-2'>Close</label>
                        <input 
                            type="time" 
                            id="closing_time" 
                            name="closing_time"
                            value={newBranch.closing_time}
                            onChange={handleChange} 
                            className='w-2/5 px-2 py-2 border-2 border-black rounded-lg max-sm:px-1'
                        />
                    </div>
                    <div className="mt-6 mb-8 mx-8 flex flex-col items-center">
                        <button 
                            className="w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-bas"
                            onClick={handleCreateBranch}>
                            Create Branch
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CreateBranch;