export const createReservation = async (reservationInfo) => {
    return fetch('http://localhost:3000/reserve', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationInfo)
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                throw new Error(error.message);
            })
        }
        return response.json();
    })
}