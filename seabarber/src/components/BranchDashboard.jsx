import { useNavigate, useLocation } from 'react-router-dom';
import { getAllBranch } from '../action/branch.action';
import { deleteBranch } from '../action/branch.action';
import { useEffect, useState } from 'react';
import SalonInterior from '../assets/SalonInterior.jpg';

function BranchDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [branchperPage] = useState(3);
    const [allBranch, setAllBranch] = useState([]);
    const { user_id, full_name } = location.state || {};

    function handleDashboard() {
        navigate('/dashboard', { state: { id: user_id } });
    }

    function handleCreateBranch(){
        navigate('/createBranch', { state: { user_id, full_name }});
    }

    function handleDeleteBranch(id){
        deleteBranch(id)
        .then(() => {
            alert("Branch Successfully Deleted");
        })
        .catch(error => {
            alert(error);
        })
    }
    
    function handleEditBranch(id, branch){
        navigate('/editBranch', { state: { user_id, full_name, branch_id: id,  name: branch.name, location: branch.location, open_time: branch.open_time, close_time: branch.close_time } });
    }

    function handleBranchDetail() {
        getAllBranch()
            .then(data => {
                setAllBranch(data);
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        handleBranchDetail();
    }, []);

    const indexOfLastBranch = currentPage * branchperPage;
    const indexOfFirstBranch = indexOfLastBranch - branchperPage;
    const currentBranches = allBranch.slice(indexOfFirstBranch, indexOfLastBranch);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <nav className='flex flex-row justify-around bg-'>
                <h1 className='text-4xl py-4 text-black max-sm:text-2xl'>SEA Salon</h1>
                <ul className='flex flex-row items-center'>
                    <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-base max-sm:mx-1' onClick={handleDashboard}>{full_name}</li>
                </ul>
            </nav>
            <main
                className="h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${SalonInterior})`, opacity: 0.80 }}
            >
                <div className="w-1/2 h-3/5 bg-white rounded-xl flex flex-col justify-center max-2xl:w-1/3 max-xl:w-3/5 max-sm:w-11/12 max-sm:h-3/5">
                    <ul className="my-4 mx-1 grid grid-cols-3 overflow-x-auto">
                        {currentBranches.map((branch, index) => (
                            <div className='px-2 py-2 mx-1 flex flex-col border-2 border-black rounded-xl'>
                                <p className='mb-2 text-2xl text-center max-sm:text-xl'>{branch.name}</p>
                                <p className='mb-2 text-xl max-sm:text-sm'><i className='fas fa-map mr-2 text-xl max-sm:text-sm'></i>{branch.location}</p>
                                <p className='mb-2 text-xl text-center max-sm:text-base'><i className='fas fa-door-open mr-2 text-xl max-sm:text-sm'></i>{branch.open_time}</p>
                                <p className='text-xl text-center max-sm:text-base'><i className='fas fa-door-closed mr-2 text-xl max-sm:text-sm'></i>{branch.close_time}</p>
                                <div className="mt-4 flex flex-col items-center">
                                    <button 
                                        className="w-5/6 mb-4 px-2 py-2 text-xl border-2 bg-green-600 text-white border-black rounded-xl max-sm:text-base max-sm:py-2"
                                        onClick={() => handleEditBranch(branch.id, branch)}>
                                        Edit
                                    </button>
                                    <button 
                                        className="w-5/6 px-2 py-2 text-xl bg-red-600 text-white font-bold border-2 border-black rounded-xl max-sm:text-base"
                                        onClick={() => handleDeleteBranch(branch.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: Math.ceil(allBranch.length / branchperPage) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 mb-4 flex flex-col items-center">
                        <button 
                            className="w-1/3 px-4 py-4 text-xl border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base max-sm:py-2"
                            onClick={handleCreateBranch}>
                            Add Branch
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default BranchDashboard;
