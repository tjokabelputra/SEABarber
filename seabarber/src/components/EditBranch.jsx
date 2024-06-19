import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { editBranch } from '../action/branch.action';
import SalonInterior from '../assets/SalonInterior.jpg';

function EditBranch() {
    const navigate = useNavigate();
    const loc = useLocation();

    const { user_id, full_name, branch_id, name: initialName, location: initialLocation, open_time: initialOpenTime, close_time: initialCloseTime } = loc.state || {};

    const [branch, setBranch] = useState({
        name: initialName || '',
        location: initialLocation || '',
        open_time: initialOpenTime || '',
        close_time: initialCloseTime || ''
    });

    const handleBranchDashboard = () => {
        navigate('/branchDashboard', { state: { user_id, full_name }});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'open_time' || name === 'close_time') {
            formattedValue = `${value}:00`;
        }

        setBranch({
            ...branch,
            [name]: formattedValue,
        });
    };

    const handleEditBranch = () => {
        editBranch(branch_id, branch)
        .then(() =>{
            alert("Branch Information Successfully Edited")
            navigate('/branchDashboard', { state: { user_id, full_name }});
        })
        .catch(error => {
            alert(error);
        }) 
    };

    return (
        <>
            <nav className='flex flex-row justify-around bg-gray-100'>
                <h1 className='text-4xl py-4 text-black max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleBranchDashboard}>Branch List</li>
                </ul>
            </nav>
            <main
                className="h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${SalonInterior})`, opacity: 0.80 }}
            >
                <div className="w-1/4 h-1/2 bg-white rounded-xl flex flex-col justify-center max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12 max-sm:h-3/5">
                    <h1 className="pt-4 pb-2 px-8 text-3xl text-center max-sm:text-2xl">Edit Branch</h1>
                    <div className='mb-2 mx-8 flex flex-col'>
                        <label htmlFor="name" className='mr-4 text-xl max-sm:text-base'>Branch Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={branch.name}
                            onChange={handleChange}
                            className='px-2 py-2 border-2 text-xl border-black rounded-lg max-sm:text-sm'
                        />
                    </div>
                    <div className='mb-2 mx-8 flex flex-col'>
                        <label htmlFor="location" className='mr-4 text-xl max-sm:text-base'>Branch Location</label>
                        <textarea 
                            name="location"
                            id="location"
                            value={branch.location}
                            onChange={handleChange}
                            placeholder='Branch Location' 
                            className='px-2 py-2  h-32 text-xl border-2 border-black rounded-lg max-xl:w-3/5 resize-none max-lg:w-3/5 max-md:w-4/5'/>
                    </div>
                    <div className='mb-2 mt-4 mx-8 flex flex-row items-center max-sm:ml-4 max-sm:mr-8 max-sm:mt-2'>
                        <label htmlFor="open_time" className='text-xl mr-4 max-sm:text-base max-sm:mr-1'>Open</label>
                        <input 
                            type="time" 
                            id="open_time" 
                            name="open_time" 
                            value={branch.open_time}
                            onChange={handleChange}
                            className='w-3/5 px-2 py-2 border-2 border-black rounded-lg max-sm:px-1'
                        />
                        <label htmlFor="close_time" className='text-xl ml-4 mr-4 max-sm:text-base max-sm:mr-2'>Close</label>
                        <input 
                            type="time" 
                            id="close_time" 
                            name="close_time"
                            value={branch.close_time}
                            onChange={handleChange}
                            className='w-3/5 px-2 py-2 border-2 border-black rounded-lg max-sm:px-1'
                        />
                    </div>
                    <div className="mt-8 mb-4 flex flex-col items-center">
                        <button 
                            className="w-3/5 px-2 py-2 text-xl border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base max-sm:py-2"
                            onClick={handleEditBranch}
                        >
                            Edit Branch
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default EditBranch;
