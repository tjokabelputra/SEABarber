import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../action/account.action";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){
    const navigate = useNavigate();
    const [newAccount, setNewAccount] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'Customer'
    })

    const handleChange = (e) => {
        setNewAccount({
            ...newAccount,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = () =>{
        createAccount(newAccount)
        .then(() => {
            toast.success('Account Successfully Created', {
                position: "top-center",
                autoClose: 5000,
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
        })
        .catch(error => {
            console.log(error.message)
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
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1'><Link to="/">Home</Link></li>
                    <li className='mx-4 text-2xl text-white cursor-pointer max-sm:text-base max-sm:mx-1'><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <main className="h-svh bg-slate-900 bg-center flex justify-center items-center">
                <div className="bg-white rounded-xl flex flex-col justify-center max-2xl:w-3/5 max-sm:w-11/12">
                    <h1 className="mt-8 text-4xl text-center">Register</h1>
                    <p className="mt-4 mx-4 text-xl text-center font-semibold max-sm:mx-2">Register Today to Access Exclusive Content</p>
                    <div className='mt-6 mx-8 flex flex-col'>
                        <label htmlFor="username" className='mr-4 text-xl max-sm:text-base'>Full Name</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Full Name" 
                            value={newAccount.username}
                            onChange={handleChange}
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg'
                        />
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="email" className='mr-4 text-xl max-sm:text-base'>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            value={newAccount.email}
                            onChange={handleChange}
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg'
                        />
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="password" className='mr-4 text-xl max-sm:text-base'>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Password"
                            value={newAccount.password}
                            onChange={handleChange}  
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg'
                        />
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="phone" className='mr-4 text-xl max-sm:text-base '>Phone</label>
                        <input 
                            type="phone" 
                            name="phone" 
                            id="phone"
                            placeholder="Phone: 08xxxx" 
                            value={newAccount.phone}
                            onChange={handleChange}  
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg' 
                        />
                    </div>
                    <div className="mt-6 mx-8 flex flex-col items-center">
                        <button 
                            className="w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                            onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                    <div className="mt-4 mb-8 flex flex-row justify-center">
                        <p className="mr-2">Already Have an Account?</p>
                        <p className="text-blue-500"><Link to="/login">Click Here</Link></p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Register;
