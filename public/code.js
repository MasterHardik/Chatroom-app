// 4. Creating socket and listners
(function () {
    const app = document.querySelector(".app");
    const socket = io();

    let uname;
    app.querySelector(".join-screen #join-user").addEventListener("click", function () {
        alert("fdsfds");
        let username = app.querySelector(".join-screen #username").value;
        if (username.length == 0) {
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });
    
    app.querySelector(".chat-screen #send-message").addEventListener("click", function (){
        let message = app.querySelector(".chat-screen #message-input").value;
    if (message.length == 0) {
        return;
    }
    renderMessage("my", {
        username: uname,
        text: message
    });
        app.querySelector(".chat-screen #message-input").value = "";
    });
    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function () {
        socket.emit("exituser", uname);
        window.locationhref = window.location.href;
    });

    socket.on("update", function (update) {
        renderMessage("update", update);
    });
    socket.on("chat", function (message) {
        renderMessage("other", update);
    });
    
    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type == "my") {
            
        }
        else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div> class "name">You</div
                    <div class="text">${message.text}</div>
                </div>
            `
        }
        else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerHTML = message;
            messageContainer.appendChild(el);
            
        }
        // scroll chat to end
        messageContainer.scrollTo = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();