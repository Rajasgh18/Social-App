import React, { useState } from 'react'
import PostContext from './postContext';
import axios from 'axios';
export default function PostState(props) {

    const host = "http://localhost:5000";
    const userId = localStorage.getItem('userId');

    const postIntial = [];
    const [posts, setPosts] = useState(postIntial);

    const getTimeline = async () => {
        const response = await fetch(`${host}/api/posts/timeline/${userId}`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
        const json = await response.json();
        setPosts(postIntial.concat(json));
    }

    const getPost = async (id) => {
        const response = await fetch(`${host}/api/posts/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
        const json = await response.json();
        // setPosts(json);
        console.log(json)
    }

    const createPost = async (desc, img) => {
        const response = await fetch(`${host}/api/posts`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userId, desc, img })
        })
        const json = await response.json();
        setPosts(postIntial.concat(json));
    }
    const uploadPost = async(file) =>{
        await axios.post("http://localhost:5000/api/posts/upload", file);
    }

    const updatePost = async (userId, _id, desc, img) => {
        const response = await fetch(`${host}/api/posts`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userId, _id, desc, img })
        })
        postIntial.forEach(pos => {
            if (pos._id === _id) {
                pos.desc = desc;
                pos.img = img;
            }
        })
        const json = await response.json();
        setPosts(postIntial);
        console.log(json);
    }

    return (
        <PostContext.Provider value={{ getTimeline, posts, getPost, createPost, uploadPost,  updatePost }} >
            {props.children}
        </PostContext.Provider>
    );
}