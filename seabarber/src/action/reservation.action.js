export const createReservation = async (token, reservationInfo) => {
    return fetch('http://localhost:3000/reservation/add', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
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

export const getAllReservation = async(token) => {
    return fetch('http://localhost:3000/reservation/all', {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
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

export const getReservationById = async (token, rid) => {
    return fetch(`http://localhost:3000/reservation/id/${rid}`, {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
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

export const getUserReservation = async(token) => {
    return fetch('http://localhost:3000/reservation/user', {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
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

export const updateReservation = async(token, rid, editedReservation) => {
    return fetch(`http://localhost:3000/reservation/edit/${rid}`, {
        method: 'PUT',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
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

export const deleteReservation = async(token, rid) => {
    return fetch(`http://localhost:3000/reservation/delete/${rid}`, {
        method: 'DELETE',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
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