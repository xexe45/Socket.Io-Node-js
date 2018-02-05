var socket = io.connect("http://192.168.1.38:3000/", { forceNew: true });

socket.on("messages", (data) => {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map((message, index) => {
        return (`
        <div class="message">
            <strong>${message.nickname}</strong>
            <p>${message.text}</p>
        </div>
        
        `);
    }).join(' ');
    var div_msgs = (document.getElementById("mensajes"));
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(evento) {
    var message = {
        text: document.getElementById('text').value,
        nickname: document.getElementById('nickname').value,
    };

    document.getElementById("nickname").style.display = 'none';
    socket.emit('add-message', message);
    return false;
}