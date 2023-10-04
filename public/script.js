const socket = io();
let textarea = document.querySelector("#textarea");
let message_section = document.querySelector('.message_section');
let name;

do {
    name = prompt("Enter your name?");
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    //Append element
    appendElement('outgoing', msg);
    scrollToBottom();

    //Send Socket
    socket.emit("message",msg);

    //empty the textarea
    textarea.value =""
    
}

function appendElement(type, msg) {
    let newDiv = document.createElement('div');
    newDiv.classList.add(type, 'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;

    newDiv.innerHTML = markup;
    message_section.appendChild(newDiv);
}

//Receive Message

socket.on("replyMessage",(message)=>{
    appendElement('incoming', message);
    scrollToBottom();
});

function scrollToBottom(){
    message_section.scrollTop = message_section.scrollHeight;

}