export const createAccount = async (newAccountInfo) => {
    return fetch('http://localhost:3000/account/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccountInfo)
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

export const loginEvent = async (loginDetail) => {
    return fetch('http://localhost:3000/account/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetail)
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

export const logoutEvent = async (token) => {
    return fetch(`http://localhost:3000/account/logout`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    });
};