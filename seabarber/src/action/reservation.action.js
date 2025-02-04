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

export const getReservationById = async (rid) => {
    return fetch(`http://localhost:3000/reservation/${rid}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                throw new Error(error.message);
            })
        }
        return response.json()
    })
}

export const getUserReservation = async(id) => {
    return fetch(`http://localhost:3000/userReservation/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                throw new Error(error.message);
            })
        }
        return response.json()
    })
}

export const updateReservation = async(rid, editedReservation) => {
    return fetch(`http://localhost:3000/editReservation/${rid}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedReservation)
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                throw new Error(error.message);
            })
        }
        return response.json()
    })
}

export const deleteReservation = async(rid) => {
    return fetch(`http://localhost:3000/deleteReservation/${rid}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                throw new Error(error.message);
            })
        }
        return response.json()
    })
}