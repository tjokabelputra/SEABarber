import HaircutImage from './assets/Haircut.jpg';
import ManicureImage from './assets/Manicure.jpg'
import FacialImage from './assets/Facial.jpg';
import DefaultPFP from './assets/Default.jpg'
import { FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createReview, getReview, editReview, deleteReview } from './action/review.action';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const stars = Array(5).fill(0);
  const [currValue, setCurrValue] = useState(0);
  const [hovValue, setHovValue] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    comment: '',
    star: 0,
  });
  const [review, setReview] = useState({
    name: '',
    comment: '',
    score: 0,
  });
  const { id, full_name, phone, role } = location.state || {};

  useEffect(() => {
    if (full_name) {
      setNewReview(prevState => ({
        ...prevState,
        name: full_name
      }));
      getReview(full_name)
        .then(data => {
          if (data) {
            setReview({
              name: full_name,
              comment: data.comment,
              score: data.score
            });
            setCurrValue(data.score);
          }
        })
        .catch(error => {
          if(error.message !== 'No Review Found'){
            alert(error);
          }
        });
    }
  }, [full_name]);
  
  function handleReservation(){
    if(id != null && role == 'Customer'){
      navigate('/reserve', { state: { id, full_name, phone, role } });
    }
    else{
      navigate('/login')
    }
  }

  function handleDashboard(){
    navigate('/dashboard', { state: { id: id } });
  }

  function handleBranchList(){
    navigate('/branch', {state : { id, full_name, phone, role } });
  }

  const handleClick = value => {
    setCurrValue(value);
    setNewReview(prevState => ({
      ...prevState,
      star: value
    }));
  }

  const handleMouseHover = value =>{
    setHovValue(value)
  }

  const handleMouseLeave = () => {
    setHovValue(undefined)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  function handleSubmit() {
    createReview(newReview)
    .then(() => {
      toast.success('Review Added', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      setNewReview({
        name: '',
        comment: '',
        star: 0,
      });
      setCurrValue(newReview.star)
      setReview(newReview);
    })
    .catch(error => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
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

  function handleEdit() {
    const editReviewInfo = {comment: newReview.comment, score: newReview.star};
    editReview(full_name, editReviewInfo)
      .then(() => {
        setReview({
          name: newReview.name,
          comment: newReview.comment,
          score: newReview.star
        });
        setCurrValue(newReview.star);
        setIsEdit(false);
        toast.success('Review Updated', {
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
      })
      .catch(error => {
        alert(error.message);
      });
  }

  function handleEditReview() {
    setIsEdit(true);
    setNewReview(prevState => ({
      ...prevState,
      name: review.name,
      comment: review.comment,
      star: review.score
    }));
  }

  function handleCancelEdit(){
    setIsEdit(false);
    toast.info('Cancel Edit Review', {
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
    setNewReview({
      name: '',
      comment: '',
      star: 0,
    });
  }

  function handleDeleteReview(){
    deleteReview(full_name)
    .then(() => {
      setReview({
        name: '',
        comment: '',
        score: 0,
      });
      setCurrValue(0);
      setNewReview(prevState => ({
        ...prevState,
        name: full_name || '',
        comment: '',
        star: 0
      }));
      toast.success('Review Deleted', {
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
    })
    .catch(error => {
      alert(error);
    });
  }

  return (
    <div className='font-body'>
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
      <nav className='flex flex-row bg-slate-900 justify-between items-center'>
          <p className='ml-8 text-4xl text-white 
          max-lg:ml-4 max-lg:text-2xl 
          max-sm:text-xl'>SEA</p>
          <div className='flex-1 flex justify-center'>
            <ul className='my-4 flex flex-row items-center'>
              <li className='ml-8 mr-4 text-2xl text-gray-200 cursor-pointer 
              max-lg:ml-4 max-lg:mr-2 max-lg:text-xl
              max-sm:ml-1 max-sm:mr-1 max-sm:text-xs' onClick={handleBranchList}>Branch</li>
              {role != 'Admin' &&
              <li className='mr-8 ml-4 text-2xl text-gray-200 cursor-pointer 
              max-lg:mr-2 max-lg:ml-4 max-lg:text-xl
              max-sm:mr-1 max-sm:ml-1 max-sm:text-xs' onClick={handleReservation}>Reservation</li>
              }
              {id != null &&
              <li className='text-2xl text-gray-200 cursor-pointer max-lg:text-xl max-sm:text-xs' onClick={handleDashboard}>{full_name.slice(0,10)}</li>
              }
            </ul>
          </div>
          {id == null &&
          <div className='mr-8 flex flex-row items-center max-lg:mr-4'>
              <p className='mr-4 text-2xl font-semibold text-gray-200 cursor-pointer 
              max-lg:mr-2 max-lg:text-xl
              max-sm:mr-1 max-sm:text-xs'><Link to='/login'>Login</Link></p>
              <p className='ml-4 px-2 py-1 text-2xl font-semibold text-slate-900 bg-gray-200 border-1 border-gray-200 rounded-lg cursor-pointer 
              max-lg:mr-2 max-lg:text-xl
              max-sm:ml-0 max-sm:text-xs'><Link to='/register'>Sign up</Link></p>
          </div>
          }
      </nav>
      
      <main className='h-lvh bg-slate-900'>
        <article className="h-1/2 bg-slate-900 flex flex-col justify-center items-center">
          <h1 className="py-4 text-6xl text-gray-200 max-sm:text-5xl">SEA Salon</h1>
          <p className="py-4 text-4xl font-semibold text-gray-200 max-sm:text-xl">Beauty and Elegance Redefined</p>
        </article>

        <article className='h-3/6 bg-slate-900 flex justify-start items-center'>
          <div className='flex flex-row items-center max-w-full'>
            <ul className='flex flex-col'>
              <li className='py-2 pl-12 text-5xl font-bold text-gray-200 max-lg:text-4xl 
              max-sm:text-2xl max-sm:pl-8'>Hair Cut</li>
              <li className='py-2 pl-12 text-4xl font-semibold text-gray-200 max-lg:text-3xl 
              max-sm:text-xl max-sm:py-1 max-sm:pl-8'>Redefine Your Look</li>
              <li className='py-2 pl-12 text-2xl text-gray-200
              max-sm:text-sm max-sm:py-1 max-sm:pl-8'>Transform your look with our expert haircut services, designed to bring out the best in you. 
                Our skilled stylists combine precision, creativity, and the latest trends to craft a hairstyle that perfectly complements your personality and lifestyle.</li>
            </ul>
            <img src={HaircutImage} alt="Haircut" className="mx-16 w-1/4 border-2 border-gray-200 rounded-br-2xl rounded-tr-2xl max-2xl:w-1/3 
            max-sm:w-0 max-sm:border-0" />
          </div>
        </article>
        
        <article className='h-3/6 bg-gray-200 flex justify-start items-center'>
          <div className='flex flex-row items-center max-w-full'>
            <img src={ManicureImage} alt="Manicure" className="mx-16 w-1/4 border-2 border-slate-900 rounded-bl-2xl rounded-tl-2xl max-2xl:w-1/3 max-lg:w-1/3 
            max-sm:w-0 max-sm:border-0"/>
            <ul className='flex flex-col'>
              <li className='py-2 pr-12 text-5xl text-slate-900 font-bold max-lg:text-4xl max-sm:text-2xl max-sm:pr-4'>Manicure and Pedicure</li>
              <li className='py-2 pr-12 text-4xl text-slate-900 font-semibold max-lg:text-3xl 
              max-sm:text-xl max-sm:py-1 max-sm:pr-4'>Beauty at Your Fingertips</li>
              <li className='py-2 pr-12 text-2xl text-slate-900
              max-sm:text-sm max-sm:py-1 max-sm:pr-4'>Indulge in the ultimate pampering experience with our luxurious manicure and pedicure services. 
              Our skilled technicians provide meticulous care to your hands and feet, ensuring they look and feel their best.</li>
            </ul>
          </div>
        </article>

        <article className='h-3/6 bg-slate-900 flex justify-start items-center'>
          <div className='flex flex-row items-center max-w-full'>
            <ul className='flex flex-col justify-center h-full'>
              <li className='py-2 pl-12 text-5xl font-bold text-gray-200 max-lg:text-4xl 
              max-sm:text-2xl max-sm:pl-8'>Facial Treatment</li>
              <li className='py-2 pl-12 text-4xl font-semibold text-gray-200 max-lg:text-3xl 
              max-sm:text-xl max-sm:py-1 max-sm:pl-8'>Experience the Glow</li>
              <li className='py-2 pl-12 text-2xl text-gray-200 
              max-sm:text-sm max-sm:py-1 max-sm:pl-8'>Reveal your natural radiance with our rejuvenating facial treatments. 
                Using advanced skincare techniques and premium products, our experienced estheticians tailor each facial to address your unique skin concerns.</li>
            </ul>
            <img src={FacialImage} alt="Facial" className="mx-16 w-1/4 border-2 border-gray-200 rounded-br-2xl rounded-tr-2xl max-2xl:w-1/3 max-lg:w-1/3 
            max-sm:w-0 max-sm:border-0" />
          </div>
        </article>

        <article className='h-1/2 bg-gray-200 bg-cover bg-center flex flex-col justify-center items-center'>
          <ul className='w-1/3 flex flex-col bg-slate-900 bg-opacity-90 rounded-xl max-xl:w-1/2 max-sm:w-3/4'>
            <li className='px-12 pt-4 pb-4 text-3xl text-gray-200 text-center 
            max-sm:text-xl max-sm:pb-1 max-sm:pt-2'>Contact Us</li>
            <li className='px-12 pb-4 pt-4 text-xl text-gray-200 max-xl:px-2 
            max-sm:text-sm max-sm:pt-1'>For immediate assistance, please contact us. Our team is ready to help you with any inquiries you may have.</li>
            <ul className='flex flex-col text-center'>
              <li className='pt-4 pb-2 text-4xl text-gray-200 
              max-sm:text-xl max-sm:pt-2 max-sm:pb-1'>Thomas</li>
              <li className='pt-2 pb-4 text-2xl text-gray-200 
              max-sm:text-base max-sm:pb-2 max-sm:pt-1'><i className='fab fa-whatsapp'></i> 08123456789</li>
            </ul>
            <ul className='flex flex-col text-center'>
              <li className='pt-4 pb-2 text-4xl text-gray-200 
              max-sm:text-xl max-sm:pt-2 max-sm:pb-1'>Sekar</li>
              <li className='pb-4 pt-2 text-2xl text-gray-200 
              max-sm:text-base max-sm:pb-2 max-sm:pt-1'><i className='fab fa-whatsapp'></i> 08164829372</li>
            </ul>
          </ul>
        </article>
        
        <article className='h-1/2 bg-slate-900 bg-cover bg-center max-sm:h-1/2'>
          <h1 className='pt-8 pb-4 text-4xl text-center text-gray-200 
          max-lg:text-3xl max-lg:pt-6 max-xl:pb-3 
          max-sm:text-xl max-sm:pt-2 max-sm:pb-1'>Rate Our Service</h1>
          {review.score == 0 ? (
          <p className='py-4 mx-4 text-xl text-gray-200 text-center 
          max-lg:py-3 max-lg:text-base
          max-sm:py-1 max-sm:text-xs'>Your feedback on our service is valuable. Please rate your experience with our team.</p>
          ) : (
          <p className='py-4 mx-4 text-xl text-gray-200 text-center 
          max-lg:py-3 max-lg:text-base
          max-sm:py-1 max-sm:text-xs'>Thank you for your feedback! Your review has been successfully submitted and will help us improve our services.</p>
          )}
          {id != null ? ( 
            ((review.score != 0 && isEdit === false) ? (
              <>
              <div className='my-4 h-1/2 flex justify-center max-sm:my-1'>
                <div className='py-4 px-4 w-1/4 bg-gray-200 rounded-xl flex flex-col justify-center max-xl:w-3/5
                max-sm:w-5/6 max-sm:py-2'>
                  <div className='mb-4 flex flex-row justify-center items-center max-sm:mb-2'>
                    <img src={DefaultPFP} alt="PFP" className='mx-2 w-1/4 border-2 border-slate-900 rounded-full'/>
                    <div className='flex flex-col items-center'>
                      <p className='mx-2 text-xl max-sm:text-base'>{review.name}</p>
                      <div className='mt-2 flex flex-row'>
                        {stars.map((_, index) => {
                          return(
                            <FaStar 
                              className='mx-1 text-3xl cursor-pointer max-md:text-2xl max-sm:text-xl' 
                              key={index} 
                              color={currValue > index ? '#FCD34D' : '#171717'}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <p className='mt-4 px-2 text-xl max-sm:text-xs max-sm:mt-2'>{review.comment}</p>
                </div>
              </div>
              <div className='mt-4 flex flex-row justify-center'>
                <button className='w-1/12 py-2 mx-2 text-xl font-semibold bg-blue-600 border-2 border-blue-600 rounded-xl max-xl:w-1/4
                max-sm:w-2/5 max-sm:text-base' onClick={handleEditReview}>Edit</button>
                <button className='w-1/12 py-2 mx-2 text-xl font-semibold bg-red-600 border-2 border-red-600 rounded-xl max-xl:w-1/4 
                max-sm:w-2/5 max-sm:text-base' onClick={handleDeleteReview}>Delete</button>
              </div>
              </>
            ) : (
          <>
            <div className='flex flex-row justify-center'>
              {stars.map((_, index) => {
                return(
                  <FaStar 
                    className='mx-2 text-5xl cursor-pointer max-md:text-4xl max-sm:text-3xl' 
                    key={index} 
                    color={(hovValue || currValue) > index ? '#FCD34D' : '#FFFFFF'}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseHover(index + 1)}
                    onMouseLeave={handleMouseLeave}
                  />
                )
              })}
            </div>
            <div className='py-4 flex justify-center max-sm:py-2'>
              <textarea
                name="name"
                placeholder='Your Name'
                value={newReview.name}
                onChange={handleInputChange}
                className='px-2 py-2 w-2/5 h-12 text-xl border-2 border-slate-900 rounded-lg resize-none max-xl:w-3/5 max-lg:w-3/5 
                max-sm:w-4/5 max-sm:text-base max-sm:h-11'
              />
            </div>
            <div className='py-4 flex justify-center max-sm:py-2'>
              <textarea 
                name="comment"
                placeholder='Comment Here About Your Experience' 
                className='px-2 py-2 w-2/5 h-32 text-xl border-2 border-slate-900 rounded-lg max-xl:w-3/5 max-lg:w-3/5 
                max-sm:w-4/5 max-sm:text-sm max-sm:h-20'
                value={newReview.comment}
                onChange={handleInputChange}/>
            </div>
            <div className='mt-4 flex justify-center max-sm:mt-2'>
              {isEdit === true ? (
                <div className='w-2/5 flex flex-row justify-center max-lg:w-3/5 max-sm:w-4/5'>
                  <button
                  className='w-1/2 py-2 mb-4 mx-4 text-2xl border-2 rounded-lg text-gray-200 border-red-600 bg-red-600 max-xl:w-3/5 
                  max-lg:w-2/5 max-lg:text-base
                  max-sm:w-1/2 max-sm:text-sm max-sm:mb-2 max-sm:py-1'
                  onClick={handleCancelEdit}>Cancel</button>
                  <button
                  className='w-1/2 py-2 mb-4 mx-4 text-2xl border-2 rounded-lg text-gray-200 border-blue-600 bg-blue-600 max-xl:w-3/5
                  max-lg:w-2/5 max-lg:text-base 
                  max-sm:w-1/2 max-sm:text-sm max-sm:mb-2 max-sm:py-1'
                  onClick={handleEdit}>Edit</button>
                </div>
              ) : (
                <button 
                className='w-1/4 py-2 mb-4 text-2xl border-2 rounded-lg text-gray-200 border-green-600 bg-green-600 max-xl:w-3/5 max-lg:w-2/5 
                max-sm:w-1/2 max-sm:text-base max-sm:mb-2 max-sm:py-1'
                onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </>
          ))) : (
            <p className='pt-2 text-2xl text-center text-gray-200 max-md:text-xl'>Click <Link to='/login' className='text-blue-400'>Here </Link>To Log in So You Can Leave a Review About Our Services</p>
          )}
        </article>
      </main>
    </div>
  )
}

export default App
