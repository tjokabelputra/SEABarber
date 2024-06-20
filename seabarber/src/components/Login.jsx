import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginEvent } from "../action/account.action";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Salon from "../assets/Salon.jpg"

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
            navigate('/dashboard', { state: { id: data.id } });
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
        <>
            <ToastContainer/>
            <nav className='flex flex-row justify-around bg-'>
                <h1 className='text-4xl py-4 text-black max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1'><Link to="/">Home</Link></li>
                </ul>
            </nav>
            <main 
                className="h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${Salon})`, opacity: 0.80 }}
            >
                <div className="w-1/4 h-2/5 bg-white rounded-xl flex flex-col justify-center max-2xl:h-1/2 max-2xl:w-3/5 max-lg:w-3/5 max-sm:w-11/12 max-sm:h-3/5">
                    <h1 className="pt-4 pb-2 px-8 text-3xl text-center max-sm:text-2xl">Login</h1>
                    <p className="pb-4 px-4 text-xl text-center font-semibold max-sm:text-base max-sm:pb-2">Login to Access Our Reservation System</p>
                    <div className='mb-4 mx-8 flex flex-col'>
                        <label htmlFor="email" className='mr-4 text-xl max-sm:text-base'>Email</label>
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
                    <div className='mb-4 mx-8 flex flex-col'>
                        <label htmlFor="password" className='mr-4 text-xl max-sm:text-base'>Password</label>
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
                    <div className="mt-2 mb-4 flex flex-col items-center">
                        <button 
                            className="w-1/2 px-3 py-3 text-xl border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base"
                            onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className="flex flex-row justify-center">
                        <p className="mr-2">Dont Have an Account Yet?</p>
                        <p className="text-blue-500"><Link to="/register">Click Here</Link></p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;