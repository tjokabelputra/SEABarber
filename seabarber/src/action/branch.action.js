export const createBranch = (token, newBranchInfo) => {
    return fetch('http://localhost:3000/branch/add', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(newBranchInfo)
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

export const getAllBranch = (token) => {
    return fetch('http://localhost:3000/branch/all', {
        method: 'GET',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
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

export const getBranchById = (token, id) => {
    return fetch(`http://localhost:3000/branch/id/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
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

export const editBranch = (token, id, branchInfo) => {
    return fetch(`http://localhost:3000/branch/edit/${id}`, {
        method: 'PUT',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(branchInfo)
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

export const deleteBranch = (token, id) => {
    return fetch(`http://localhost:3000/branch/delete/${id}`, {
        method: 'DELETE',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
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