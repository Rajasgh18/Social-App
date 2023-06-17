import './chatArea.css'

import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhotoIcon from '@mui/icons-material/Photo';
import SendIcon from '@mui/icons-material/Send';

import Message from '../message/Message';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";

export default function ChatArea({ currChat }) {

    const host = "http://localhost:5000/api";
    const userId = localStorage.getItem('userId');

    const [currUser, setCurrUser] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef();
    const scrollRef = useRef();

    const profilePic = currUser.profilePicture ? `/Assets/Posts/${currUser.profilePicture}` : "userIcon.webp";

    //Fetches the message from socket for instant message sending and receiving.
    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {

            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        })
    },[])

    useEffect(() => {
        socket?.current.emit("addUser", userId);
    }, [userId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Store the message and both user and main users id.
        const mesg = {
            conversationId: currChat._id,
            senderId: userId,
            text: newMessage
        }
        const recieverId = await currChat.members.find(e => e !== userId);
        //Sends the message to socket
        socket.current.emit("sendMessage", {
            senderId: userId,
            recieverId,
            text: newMessage
        })

        try {
            //Sends the messages to the database and set it to the message variable.
            const res = await axios.post(`${host}/message`, mesg);
            const convUPdate = await axios.put(`${host}/conversation/${currChat._id}`)
            setMessages([...messages, res.data]);
            currChat.updatedAt = convUPdate.updatedAt;
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    //Sets the message received from the socket in the arrival message variable which updates the chat.
    useEffect(() => {
        arrivalMessage && 
        currChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currChat])

    //Fetches the user details and store it in the user varbiable.
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${host}/users/${currChat.members.find(e => e !== userId)}`);
                setCurrUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [currChat, userId])

    //Fetches messages from the database.
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${host}/message/${currChat._id}`)
                setMessages(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currChat._id])

    //Scrolls down to the latest message.
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <>
            <div className='chatAreaWrapper'>
                <div className='chatAreaHead'>
                    <div className='chatAreaHeadLeft'>
                        <img src={profilePic} alt='' />
                        <span>{currUser.username}</span>
                    </div>
                    <div className='chatAreaHeadRight'>
                        <PhoneIcon className='chatAreaHeadIcon' />
                        <VideocamIcon className='chatAreaHeadIconV' />
                        <InfoIcon className='chatAreaHeadIcon' />
                    </div>
                </div>
                <div className="chatBox">
                    {messages && messages.map(m => {
                        return <div ref={scrollRef}><Message key={m._id} message={m} user={currUser} own={m.senderId === userId} /></div>
                    })}
                </div>
                <span></span>
                <div className="chatTypeBox">
                    <form onSubmit={handleSubmit} className='chatInputBox'>
                        <EmojiEmotionsIcon className='chatBoxIcon' />
                        <input value={newMessage} placeholder="Write something..." onChange={e => setNewMessage(e.target.value)} type="text" />
                        <button type='submit' ><SendIcon className='chatBoxIcon' /></button>
                        <PhotoIcon className='chatBoxIcon' />
                    </form>
                </div>
            </div>
        </>
    )
}
