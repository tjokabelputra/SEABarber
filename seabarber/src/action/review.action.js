export const createReview = async (reviewInfo) => {
    return fetch('http://localhost:3000/review', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewInfo)
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(error => {
                throw new Error(error.error);
            })
        }
        return response.json();
    })
}

export const getReview = async (name) => {
    return fetch(`http://localhost:3000/getReview/${name}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
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

export const editReview = async (name, editReviewInfo) => {
    return fetch(`http://localhost:3000/editReview/${name}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
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

export const deleteReview = async (name) => {
    return fetch(`http://localhost:3000/deleteReview/${name}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
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