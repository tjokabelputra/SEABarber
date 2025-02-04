import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginEvent } from "../action/account.action";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = () => {
        loginEvent(loginInfo)
        .then(data => {
            toast.success('Login Successfull', {
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
                navigate('/dashboard', { state: { id: data.id } });
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
    };

    return (
        <div className="font-body">
            <ToastContainer
                position="top-center"
                autoClose={5000}
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
                </ul>
            </nav>
            <main 
                className="h-svh bg-slate-900 bg-center flex justify-center items-center">
                <div className="w-1/4 bg-white rounded-xl flex flex-col max-2xl:w-3/5 max-lg:w-3/5 max-sm:w-11/12">
                    <h1 className="mt-8 text-4xl text-center">Login</h1>
                    <p className="mt-4 mx-4 text-xl text-center font-semibold max-sm:mx-2">Login to Access Our Rating and Reservation System</p>
                    <div className='mt-6 mx-8 flex flex-col'>
                        <label htmlFor="email" className='mb-1 text-xl max-sm:text-base'>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            value={loginInfo.email}
                            onChange={handleChange} 
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg'
                        />
                    </div>
                    <div className='mt-4 mx-8 flex flex-col'>
                        <label htmlFor="password" className='mb-1 text-xl max-sm:text-base'>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"  
                            placeholder="Password"  
                            value={loginInfo.password}
                            onChange={handleChange} 
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg'
                        />
                    </div>
                    <div className="mt-6 mx-8 flex flex-col items-center">
                        <button 
                            className="w-full py-2 text-xl bg-slate-900 text-white border-2 border-black rounded-xl max-sm:text-base"
                            onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className="mt-4 mb-8 flex flex-row justify-center">
                        <p className="mr-2">Dont Have an Account Yet?</p>
                        <p className="text-blue-500"><Link to="/register">Click Here</Link></p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;