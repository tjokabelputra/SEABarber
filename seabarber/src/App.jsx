import HaircutImage from './assets/Haircut.jpg';
import ManicureImage from './assets/Manicure.jpg'
import FacialImage from './assets/Facial.jpg';

function App() {
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
        <article className="relative h-1/2 bg-Salon bg-cover bg-center flex flex-col justify-center">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10 text-white text-center">
           <h1 className="py-4 text-6xl max-sm:text-5xl">SEA Salon</h1>
            <p className="py-4 text-4xl max-sm:text-3xl">Beauty and Elegance Redefined</p>
          </div>
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

        <article className='h-1/2 bg-SalonInterior bg-cover bg-center  flex flex-col justify-center items-center'>
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

      </main>
    </div>
  )
}

export default App
