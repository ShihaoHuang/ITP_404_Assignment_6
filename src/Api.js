export function fetchFollowers(){
    return fetch("/api/followers").then(response=>{
        console.log(response)
        return response.json();
    });
}

export function addFollower(data){
    const url = "/api/followers";
    const method = "POST";
    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
        },
    }).then(response=>{
        return response.json();
    })
}

export function unFollow(id){
    const url = `/api/followers/${id}`;
    return fetch(url, {
        method: "DELETE",
    });
}

