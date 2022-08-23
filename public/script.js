const socket = io();


$('#chat-box').hide();

$('#send-btn').click(()=>{
    const msgText=$('#inp').val();
    socket.emit('send-msg',{
        msg:msgText
    })
    $('#inp').val("");
})
socket.on('receive-msg',(data)=>{
    $('#chat').append(`<li class="border p-2 ms-0 rounded-pill mb-2"><span class="fw-bold">${data.username}</span> : ${data.msg}</li>`)
 $("#chat").scrollTop($("#chat").outerHeight());
})

$('#login-btn').click(()=>{
    const username=$('#username').val();
    socket.emit('login',{
        username:username
    })

    $('#login').hide();
    $('#chat-box').show();
    $('username').val("");
})