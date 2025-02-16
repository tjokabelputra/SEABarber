export const createReview = async (token, reviewInfo) => {
    return fetch('http://localhost:3000/review/add', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(reviewInfo)
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

export const getReview = async (token) => {
    return fetch(`http://localhost:3000/review/get`, {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
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

export const editReview = async (token, editReviewInfo) => {
    return fetch(`http://localhost:3000/review/edit`, {
        method: 'PUT',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(editReviewInfo)
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

export const deleteReview = async (token) => {
    return fetch('http://localhost:3000/review/delete', {
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
        return response.json();
    })
}