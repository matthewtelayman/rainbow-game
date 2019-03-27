'use strict'

const MESSAGE_FADE_TIME = 150; // ms
const TYPING_TIMER_LENGTH = 400; // ms
const USER_COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00'
];

const usernameInput = document.getElementById('username-input') // Input for username
const messages = document.getElementById('messages'); // Messages area
const inputMessage = document.getElementById('input-message') // Input message input box
const submitUsernameButton = document.getElementById('username-submit')
const myModal = document.getElementById('modal')

const loginPage = document.getElementById('login-page') // The login page
const chatPage = document.getElementById('chat-container'); // The chatroom page

const scoreboard = document.getElementById('scoreboard-container') //the high score table

export const showUsernameModal = () => {
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
}

// Prompt for setting a username
let username;
let connected = false;
let typing = false;
let lastTypingTime;
let currentInput = usernameInput.focus();

//var socket = io();

submitUsernameButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        $('#myModal').modal('hide')
        setUsername(username)
    } else {
        alert('Please enter a username')
    }
})

const addParticipantsMessage = (data) => {
    let message = '';
    if (data.numUsers === 1) {
        message += "there's 1 participant";
    } else {
        message += "there are " + data.numUsers + " participants";
    }
    log(message);
}

// Sets the client's username
const setUsername = (username) => {

    console.log('got username ', username)
    // If the username is valid
    // if (username) {
    //     myModal.modal('hide')
    // $loginPage.off('click');
    //currentInput = inputMessage.focus();

    // Tell the server your username
    //socket.emit('add user', username);
    //}
}

// Sends a chat message
// const sendMessage = () => {
//     let message = inputMessage.value;
//     // Prevent markup from being injected into the message
//     message = cleanInput(message);
//     // if there is a non-empty message and a socket connection
//     if (message && connected) {
//         inputMessage.value = '';
//         addChatMessage({
//             username: username,
//             message: message
//         });
//         // tell server to execute 'new message' and send along one parameter
//         //socket.emit('new message', message);
//     }
// }

// // Log a message
// const log = (message, options) => {
//     let el = document.createElement('li')
//     el.className = 'log'
//     el.innerHTML = message;
//     addMessageElement(el, options);
// }

// // Adds the visual chat message to the message list
// const addChatMessage = (data, options) => {
//     // Don't fade the message in if there is an 'X was typing'
//     let typingMessages = getTypingMessages(data);
//     options = options || {};
//     if (typingMessages.length !== 0) {
//         options.fade = false;
//         typingMessages.remove();
//     }

//     let usernameDiv = $('<span class="username"/>')
//         .text(data.username)
//         .css('color', getUsernameColor(data.username));
//     var $messageBodyDiv = $('<span class="messageBody">')
//         .text(' ' + data.message);

//     var typingClass = data.typing ? 'typing' : '';
//     var $messageDiv = $('<li class="message"/>')
//         .data('username', data.username)
//         .addClass(typingClass)
//         .append($usernameDiv, $messageBodyDiv);

//     addMessageElement($messageDiv, options);
// }

// // Adds the visual chat typing message
// const addChatTyping = (data) => {
//     data.typing = true;
//     data.message = 'is typing';
//     addChatMessage(data);
// }

// // Removes the visual chat typing message
// const removeChatTyping = (data) => {
//     getTypingMessages(data).fadeOut(function () {
//         $(this).remove();
//     });
// }

// // Adds a message element to the messages and scrolls to the bottom
// // el - The element to add as a message
// // options.fade - If the element should fade-in (default = true)
// // options.prepend - If the element should prepend
// //   all other messages (default = false)
// const addMessageElement = (el, options) => {
//     var $el = $(el);

//     // Setup default options
//     if (!options) {
//         options = {};
//     }
//     if (typeof options.fade === 'undefined') {
//         options.fade = true;
//     }
//     if (typeof options.prepend === 'undefined') {
//         options.prepend = false;
//     }

//     // Apply options
//     if (options.fade) {
//         $el.hide().fadeIn(FADE_TIME);
//     }
//     if (options.prepend) {
//         $messages.prepend($el);
//     } else {
//         $messages.append($el);
//     }
//     $messages[0].scrollTop = $messages[0].scrollHeight;
// }

// // Updates the typing event
// const updateTyping = () => {
//     if (connected) {
//         if (!typing) {
//             typing = true;
//             socket.emit('typing');
//         }
//         lastTypingTime = (new Date()).getTime();

//         setTimeout(() => {
//             var typingTimer = (new Date()).getTime();
//             var timeDiff = typingTimer - lastTypingTime;
//             if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
//                 socket.emit('stop typing');
//                 typing = false;
//             }
//         }, TYPING_TIMER_LENGTH);
//     }
// }

// // Gets the 'X is typing' messages of a user
// const getTypingMessages = (data) => {
//     return $('.typing.message').filter(function (i) {
//         return $(this).data('username') === data.username;
//     });
// }

// // Gets the color of a username through our hash function
// const getUsernameColor = (username) => {
//     // Compute hash code
//     var hash = 7;
//     for (var i = 0; i < username.length; i++) {
//         hash = username.charCodeAt(i) + (hash << 5) - hash;
//     }
//     // Calculate color
//     var index = Math.abs(hash % COLORS.length);
//     return COLORS[index];
// }
// window.keydown(event => {
//     // Auto-focus the current input when a key is typed
//     if (!(event.ctrlKey || event.metaKey || event.altKey)) {
//         currentInput.focus();
//     }
//     // When the client hits ENTER on their keyboard
//     if (event.which === 13) {
//         if (username) {
//             alert('username')
//             // sendMessage();
//             // socket.emit('stop typing');
//             // typing = false;
//         } else {
//             setUsername();
//         }
//     }
// });

// inputMessage.on('input', () => {
//     updateTyping();
// });