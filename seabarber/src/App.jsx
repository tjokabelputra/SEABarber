import HaircutImage from './assets/Haircut.jpg';
import ManicureImage from './assets/Manicure.jpg'
import FacialImage from './assets/Facial.jpg';
import salonImage from './assets/Salon.jpg';
import ReviewBackground from './assets/ReviewBackground.jpg'
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

function App() {
  const stars = Array(5).fill(0);
  const [currValue, setCurrValue] = useState(0);
  const [hovValue, setHovValue] = useState(0);
  const [review, setReview] = useState({
    name: '',
    comment: '',
    star: '',
  });

  const handleClick = value => {
    setCurrValue(value)
  }

  const handleMouseHover = value =>{
    setHovValue(value)
  }

  const handleMouseLeave = () => {
    setHovValue(undefined)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    const updatedReview = {
      ...review,
      star: currValue.toString()
    };
    setReview(updatedReview);
    console.log(updatedReview);
  };

  return (
    <div className='font-'>
      <nav className='flex flex-row justify-around bg-'>
        <h1 className='text-4xl py-4 text-black max-sm:text-2xl'>SEA Salon</h1>
        <ul className='flex flex-row items-center'>
          <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-xl max-sm:mx-1'>Home</li>
          <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-xl max-sm:mx-1'>Service</li>
          <li className='mx-4 text-2xl text-black cursor-pointer max-sm:text-xl max-sm:mx-1'>Branch</li>
        </ul>
      </nav>

      <main className='h-screen'>
        <article className="relative h-1/2 flex flex-col justify-center items-center">
          <div
            style={{
              backgroundImage: `url(${salonImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: -1,
          }}
          ></div>
          <h1 className="py-4 text-6xl max-sm:text-5xl z-10">SEA Salon</h1>
          <p className="py-4 text-4xl max-sm:text-3xl z-10">Beauty and Elegance Redefined</p>
        </article>
    
        <article className='h-3/6 bg-black flex justify-start items-center'>
          <div className='flex flex-row items-center max-w-full'>
            <ul className='flex flex-col'>
              <li className='py-2 pl-12 text-5xl font-bold text-white max-lg:text-4xl max-sm:text-2xl max-sm:pl-8'>Hair Cut</li>
              <li className='py-2 pl-12 text-4xl font-semibold text-white max-lg:text-3xl max-sm:text-xl max-sm:pl-8'>Redefine Your Look</li>
              <li className='py-2 pl-12 text-2xl text-white max-sm:text-base max-sm:pl-8'>Transform your look with our expert haircut services, designed to bring out the best in you. 
                Our skilled stylists combine precision, creativity, and the latest trends to craft a hairstyle that perfectly complements your personality and lifestyle.</li>
            </ul>
            <img src={HaircutImage} alt="Haircut" className="mx-16 w-1/4 border-2 border-white rounded-br-2xl rounded-tr-2xl max-2xl:w-1/3 max-sm:w-0 max-sm:border-0" />
          </div>
        </article>
        
        <article className='h-3/6 bg-white flex justify-start items-center'>
          <div className='flex flex-row items-center max-w-full'>
            <img src={ManicureImage} alt="Manicure" className="mx-16 w-1/4 border-2 border-black rounded-bl-2xl rounded-tl-2xl max-2xl:w-1/3 max-lg:w-1/3 max-sm:w-0 max-sm:border-0"/>
            <ul className='flex flex-col'>
              <li className='py-2 pr-12 text-5xl font-bold max-lg:text-4xl max-sm:text-2xl max-sm:pr-4'>Manicure and Pedicure</li>
              <li className='py-2 pr-12 text-4xl font-semibold max-lg:text-3xl max-sm:text-xl max-sm:pr-4'>Beauty at Your Fingertips</li>
              <li className='py-2 pr-12 text-2xl max-sm:text-base max-sm:pr-4'>Indulge in the ultimate pampering experience with our luxurious manicure and pedicure services. 
              Our skilled technicians provide meticulous care to your hands and feet, ensuring they look and feel their best</li>
            </ul>
          </div>
        </article>

        <article className='h-3/6 bg-black flex justify-start items-center'>
          <div className='flex flex-row items-center max-w-full'>
            <ul className='flex flex-col justify-center h-full'>
              <li className='py-2 pl-12 text-5xl font-bold text-white max-lg:text-4xl max-sm:text-2xl max-sm:pl-8'>Facial Treatment</li>
              <li className='py-2 pl-12 text-4xl font-semibold text-white max-lg:text-3xl max-sm:text-xl max-sm:pl-8'>Experience the Glow</li>
              <li className='py-2 pl-12 text-2xl text-white max-sm:text-base max-sm:pl-8'>Reveal your natural radiance with our rejuvenating facial treatments. 
                Using advanced skincare techniques and premium products, our experienced estheticians tailor each facial to address your unique skin concerns</li>
            </ul>
            <img src={FacialImage} alt="Facial" className="mx-16 w-1/4 border-2 border-white rounded-br-2xl rounded-tr-2xl max-2xl:w-1/3 max-lg:w-1/3 max-sm:w-0 max-sm:border-0" />
          </div>
        </article>

        <article className='h-1/2 bg-SalonInterior bg-cover bg-center flex flex-col justify-center items-center'>
          <ul className='w-1/3 flex flex-col text-white bg-white bg-opacity-90 rounded-xl max-xl:w-1/2 max-sm:w-3/4'>
            <li className='px-12 pt-4 pb-2 text-3xl text-gray-800 text-center max-xl:text-2xl max-xl:pt-2 max-sm:text-xl max-sm:px-2'>Contact Us</li>
            <li className='px-12 pb-4 pt-2 text-xl text-gray-800 max-lg:pb-2 max-sm:text-base max-xl:px-2'>For immediate assistance, please contact us. Our team is ready to help you with any inquiries you may have.</li>
            <ul className='flex flex-col text-center'>
              <li className='pb-2 text-4xl text-gray-800 max-xl:text-xl max-sm:text-xl'>Thomas</li>
              <li className='py-2 text-2xl text-gray-800 max-xl:text-xl max-sm:text-base'><i className='fab fa-whatsapp'></i> 08123456789</li>
            </ul>
            <ul className='flex flex-col text-center'>
              <li className='py-2 text-4xl text-gray-800 max-xl:text-xl max-sm:text-2xl'>Sekar</li>
              <li className='pb-4 text-2xl text-gray-800 max-xl:text-xl max-xl:pb-2 max-sm:text-base'><i className='fab fa-whatsapp'></i> 08164829372</li>
            </ul>
          </ul>
        </article>

        <article className='h-1/2 bg-ReviewBackground bg-cover bg-center max-md:h-4/5'>
          <h1 className='py-4 text-4xl text-center text-white max-md:text-2xl'>Rate Our Service</h1>
          <p className='pb-4 mx-4 text-xl text-white text-center'>Your feedback on our service is valuable. Please rate your experience with our team.</p>
          <div className='flex flex-row justify-center'>
            {stars.map((_, index) => {
              return(
                <FaStar 
                  className='mx-2 text-5xl cursor-pointer max-md:text-4xl' 
                  key={index} 
                  color={(hovValue || currValue) > index ? '#FCD34D' : '#FFFFFF'}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseHover(index + 1)}
                  onMouseLeave={handleMouseLeave}
                />
              )
            })}
          </div>
          <div className='pt-4 flex justify-center mt-4'>
            <textarea
              name="name"
              placeholder='Your Name'
              value={review.name}
              onChange={handleInputChange}
              className='px-2 py-2 w-2/5 h-12 text-xl border-2 border-black rounded-lg resize-none max-xl:w-3/5 max-lg:w-3/5 max-md:w-4/5'
            />
          </div>
          <div className='pb-4 flex justify-center mt-4'>
            <textarea 
              name="comment"
              placeholder='Comment Here About Your Experience' 
              className='px-2 py-2 w-2/5 h-32 text-xl border-2 border-black rounded-lg max-xl:w-3/5 resize-none max-lg:w-3/5 max-md:w-4/5'
              value={review.comment}
              onChange={handleInputChange}/>
          </div>
          <div className='flex justify-center mt-4'>
            <button 
              className='w-1/4 py-2 mb-4 text-2xl border-2 rounded-lg border-black bg-gray-300 max-xl:w-1/2 max-lg:w-1/2 max-wd:w-3/5'
              onClick={handleSubmit}>Submit</button>
          </div>
        </article>

      </main>
    </div>
  )
}

export default App
