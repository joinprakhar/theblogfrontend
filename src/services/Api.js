export const getAllPost = async()=>{
    return await fetch("https://blogbackend-e8fr.onrender.com/post")
}

export const deletedPost = async( id, userid)=>{    
    const data = new FormData();
    data.set("id", id);
    data.set("userId", userid);

    const response = await fetch(`https://blogbackend-e8fr.onrender.com/post`, {
        method: "DELETE",
        body: data,
        credentials: "include",
    });
    return response
}