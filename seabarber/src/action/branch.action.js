export const createBranch = (newBranchInfo) => {
    return fetch('https://api-rwvi7zgxda-uc.a.run.app/addBranch', {
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
    return fetch('https://api-rwvi7zgxda-uc.a.run.app/allBranch', {
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
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/editBranch/${id}`, {
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
    return fetch(`https://api-rwvi7zgxda-uc.a.run.app/deleteBranch/${id}`, {
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