const io = require("socket.io")(8900, {
    cors:{
        origin: "http://localhost:5173"
    }
});

let users = [];
const addUser = (userId, socketId)=>{
    !users.some(user => user.userId === userId) && users.push({userId, socketId});
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}
io.on("connection", (socket)=>{
    //Take userId from socket
    socket.on("addUser", userId =>{
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
    
    //Send and Get Message
    socket.on("sendMessage", ({senderId, recieverId, text}) => {
        const user = getUser(recieverId);
        io.to(user?.socketId).emit("getMessage", { senderId, text });
    });

    //When Disconnects
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
})