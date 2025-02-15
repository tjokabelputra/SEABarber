export const createAccount = async (newAccountInfo) => {
    return fetch('https://api-rwvi7zgxda-uc.a.run.app/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccountInfo)
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

export const loginEvent = async (loginDetail) => {
    return fetch('https://api-rwvi7zgxda-uc.a.run.app/login', {
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

export const logoutEvent = async (id, logoutDetail) => {
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/logout/${id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logoutDetail)
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

export const getAccountInfo = async (id) => {
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/detail/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
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