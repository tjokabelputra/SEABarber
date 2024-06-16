import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "./action/reservation.action";
import Salon from "./assets/Salon.jpg"

function Reservation() {
    const navigate = useNavigate();
    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        service: 'Haircut and Styling',
        date: '',
        time: '',
        dateandtime: '',
    });

    const handleAddReservation = () => {
        const time = reservation.time;
        const selectedTime = new Date(`1970-01-01T${time}`);
        const openTime = new Date(`1970-01-01T09:00`);
        const closeTime = new Date(`1970-01-01T20:00`);
    
        if (selectedTime < openTime || selectedTime > closeTime) {
            alert('Sorry, the store is closed at that time.');
            return;
        }
    
        const formattedDateTime = dateFormatter(reservation.date, reservation.time);
    
        if (formattedDateTime) {
            const updatedReservation = {
                ...reservation,
                dateandtime: formattedDateTime,
            };
    
            setReservation(updatedReservation);
            createReservation(updatedReservation)
                .then(() => {
                    alert('Reservation Successfully Added');
                    navigate('/');
                })
                .catch(error => {
                    alert(error);
                });
        } else {
            console.error('Failed to format date and time');
        }
    };

    const handleChange = (e) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value,
        });
    };

    const dateFormatter = (date, time) => {
        const [hours, minutes] = time.split(':');
        const dateTimeString = `${date}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
        const dateTime = new Date(dateTimeString);
    
        if (isNaN(dateTime.getTime())) {
            console.error('Invalid date-time format:', dateTimeString);
            return null;
        }

        const isoString = `${dateTime.getFullYear()}-${String(dateTime.getMonth() + 1).padStart(2, '0')}-${String(dateTime.getDate()).padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;
    
        return isoString;
    };

    return (
        <>
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
                <div className="w-1/4 h-1/2 bg-white rounded-xl flex flex-col justify-center max-2xl:h-4/5 max-2xl:w-3/5 max-lg:h-3/5 max-lg:w-3/5 max-sm:w-11/12 max-sm:h-3/4">
                    <h1 className="pt-4 px-8 text-3xl text-center max-sm:text-2xl">Reservation</h1>
                    <p className="pb-4 px-4 text-xl text-center font-semibold max-sm:text-base max-sm:pb-2">Store open from 9.00 A.M untill 9.00 P.M Each Session 1 Hour</p>
                    <div className='mb-2 mx-8 flex flex-col'>
                        <label htmlFor="name" className='mr-4 text-xl max-sm:text-base'>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Name" 
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-2 mt-2 mx-8 flex flex-col'>
                        <label htmlFor="phone" className='mr-4 text-xl max-sm:text-base'>Phone</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            placeholder="Phone: 08xxxx" 
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='my-2 mx-8 flex flex-col max-sm:my-2'>
                        <label htmlFor="service" className='mr-4 text-xl max-sm:text-base'>Service</label>
                        <select 
                            id="service" 
                            name="service" 
                            className='px-2 py-2 border-2 border-black rounded-lg'
                            value={reservation.service}
                            onChange={handleChange}
                        >
                            <option value="Haircut and Styling">Haircut and Styling</option>
                            <option value="Manicure and Pedicure">Manicure and Pedicure</option>
                            <option value="Facial Treatments">Facial Treatments</option>
                        </select>
                    </div>
                    <div className='mb-2 mt-4 mx-8 flex flex-row items-center max-sm:ml-4 max-sm:mr-8 max-sm:mt-2'>
                        <label htmlFor="date" className='text-xl mr-4 max-sm:text-base max-sm:mr-1'>Date</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date" 
                            className='w-3/5 px-2 py-2 border-2 border-black rounded-lg max-sm:px-1'
                            value={reservation.date}
                            onChange={handleChange}
                        />
                        <label htmlFor="time" className='text-xl ml-4 mr-4 max-sm:text-base max-sm:mr-2'>Time</label>
                        <input 
                            type="time" 
                            id="time" 
                            name="time" 
                            className='w-3/5 px-2 py-2 border-2 border-black rounded-lg max-sm:px-1'
                            value={reservation.time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-2 flex flex-col items-center">
                        <button 
                            className="w-1/2 px-2 py-2 border-2 border-black rounded-xl max-sm:w-1/2 max-sm:text-base"
                            onClick={handleAddReservation}
                        >
                            Add Reservation
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Reservation;
