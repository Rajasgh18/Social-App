import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './userContext';
export default function UserState(props) {
    const Navigate = useNavigate();
    const host = "http://localhost:5000";
    const userInitial = { username: "none", profilePicture: "", coverPicture: "", followers: "" };
    const friendInitial = [];
    const mainUserInitial = { username: "none", profilePicture: "", coverPicture: "", followers: "" };
    const [mainUser, setMainUser] = useState(mainUserInitial);
    const [user, setUser] = useState("");
    const [friend, setFriend] = useState(friendInitial);
    const [isUpdate, setIsUpdated] = useState(false);
    const userId = localStorage.getItem('userId');
    const getUser = async (id) => {
        const response = await fetch(`${host}/api/users/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
        const json = await response.json();
        setUser(json);
    }
    const getFriend = async (id) => {
        const response = await fetch(`${host}/api/users/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
        const json = await response.json();
        friendInitial.push(json)
        setFriend(friendInitial);
    }

    const getMainUser = async () => {
        const response = await fetch(`${host}/api/users/${userId}`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
        const json = await response.json();
        setMainUser(json);
    }

    const createUser = async (username, email, password) => {
        const response = await fetch(`${host}/api/auth/register`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        const json = await response.json();
        if (json.success) {
            setMainUser(json.user);
            localStorage.setItem('userId', json._id);
            localStorage.setItem('token', json.authToken);
            Navigate("/")
        }
        else {
            console.log(json.error);
        }
    }

    const loginUser = async (email, password) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();
        if (json.success) {
            setMainUser(json.user);
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('userId', json.user._id);
            Navigate("/");
        }
        else {
            console.log(json.error);
        }
    }

    const updateUserCoverPicture = async (coverPicture) => {
        const response = await fetch(`${host}/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userId, coverPicture })
        })
        const json = response.json();
        console.log(json)
    }
    const updateUserProfilePicture = async (profilePicture) => {
        const response = await fetch(`${host}/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ userId, profilePicture })
        })
        const json = response.json();
        console.log(json)
    }
    const [mode, setMode] = useState("light");
    return (
        <UserContext.Provider value={{ isUpdate, setIsUpdated, mode, setMode, host, Navigate, createUser, loginUser, mainUser, setMainUser, getMainUser, user, getUser, friend, getFriend, updateUserCoverPicture, updateUserProfilePicture }} >
            {props.children}
        </UserContext.Provider>
    )
}
