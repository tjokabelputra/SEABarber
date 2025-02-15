export const createReservation = async (reservationInfo) => {
    return fetch('https://api-rwvi7zgxda-uc.a.run.app/reserve', {
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

export const getAllReservation = async() => {
    return fetch('https://api-rwvi7zgxda-uc.a.run.app/allReservation', {
        method: 'GET',
        headers: { "Content-Type": "application/json"}
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message);
            });
        }
        return response.json();
    })
}

export const getReservationById = async (rid) => {
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/reservation/${rid}`, {
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
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/userReservation/${id}`, {
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
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/editReservation/${rid}`, {
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
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/deleteReservation/${rid}`, {
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