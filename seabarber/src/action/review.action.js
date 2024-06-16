export const createReview = async (reviewInfo) => {
    return fetch('http://localhost:3000/review', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
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