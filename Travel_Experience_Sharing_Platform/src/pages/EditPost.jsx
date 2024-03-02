import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../appwrite/config";
import { PostForm } from "../exports";
function EditPost(){

    const [post,setPost]=useState()
    const {slug}=useParams()

    useEffect(()=>{
        service.getPost(slug).then((data)=>{
            
            setPost(data)
        })

    },[slug])

    return post? (
        <PostForm post={post} />


    ):null
}
export default EditPost