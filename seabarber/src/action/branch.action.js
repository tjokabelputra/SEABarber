export const createBranch = (newBranchInfo) => {
    return fetch('http://localhost:3000/addBranch', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
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

export const getAllBranch = () => {
    return fetch('http://localhost:3000/allBranch', {
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

export const editBranch = (id, branchInfo) => {
    return fetch(`http://localhost:3000/editBranch/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
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

export const deleteBranch = (id) => {
    return fetch(`http://localhost:3000/deleteBranch/${id}`, {
        method: 'DELETE',
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