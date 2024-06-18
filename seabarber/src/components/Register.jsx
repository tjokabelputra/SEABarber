import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../action/account.action";
import Salon from "../assets/Salon.jpg"
import { useState } from "react";

function Register(){
    const navigate = useNavigate();
    const [newAccount, setNewAccount] = useState({
        full_name: '',
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
            alert('Account Successfully Created')
            navigate('/login')
        })
        .catch(error =>{
            alert(error);
        })
    }

    return (
        <>
            <nav className='flex flex-row justify-around bg-'>
                <h1 className='text-4xl py-4 text-black max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1'><Link to="/">Home</Link></li>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1'><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <main 
                className="h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${Salon})`, opacity: 0.80 }}
            >
                <div className="w-1/4 h-3/5 bg-white rounded-xl flex flex-col justify-center max-2xl:h-4/5 max-2xl:w-3/5 max-lg:h-3/5 max-sm:w-11/12 max-sm:h-4/5">
                    <h1 className="pt-4 pb-2 px-8 text-3xl text-center max-sm:text-2xl">Register</h1>
                    <p className="pb-4 px-4 text-xl text-center font-semibold max-sm:text-base max-sm:pb-2">Register Today to Access Exclusive Content</p>
                    <div className='mb-4 mx-8 flex flex-col'>
                        <label htmlFor="full_name" className='mr-4 text-xl max-sm:text-base'>Full Name</label>
                        <input 
                            type="text" 
                            name="full_name" 
                            id="full_name" 
                            placeholder="Full Name" 
                            value={newAccount.full_name}
                            onChange={handleChange}
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg max-sm:text-sm'
                        />
                    </div>
                    <div className='mb-4 mx-8 flex flex-col'>
                        <label htmlFor="email" className='mr-4 text-xl max-sm:text-base'>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Email" 
                            value={newAccount.email}
                            onChange={handleChange}
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg max-sm:text-sm'
                        />
                    </div>
                    <div className='mb-4 mx-8 flex flex-col'>
                        <label htmlFor="password" className='mr-4 text-xl max-sm:text-base'>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Password"
                            value={newAccount.password}
                            onChange={handleChange}  
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg max-sm:text-sm'
                        />
                    </div>
                    <div className='mb-4 mx-8 flex flex-col'>
                        <label htmlFor="phone" className='mr-4 text-xl max-sm:text-base '>Phone</label>
                        <input 
                            type="phone" 
                            name="phone" 
                            id="phone"
                            placeholder="Phone: 08xxxx" 
                            value={newAccount.phone}
                            onChange={handleChange}  
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg max-sm:text-sm' 
                        />
                    </div>
                    <div className="mt-2 mb-4 flex flex-col items-center">
                        <button 
                            className="w-1/2 px-3 py-3 text-xl border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base max-sm:py-2"
                            onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                    <div className="flex flex-row justify-center">
                        <p className="mr-2">Already Have an Account?</p>
                        <p className="text-blue-500"><Link to="/login">Click Here</Link></p>
                    </div>
                </div>
            </main>
            
        </>
    );
}

export default Register;