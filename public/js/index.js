const socket = io();

socket.on('connect', function () {
	console.log('Connected to server');

	socket.on('newMessage', function (message) {
		console.log('newMessage', message);
	});

	socket.emit('createMessage', {
		to: 'vishal@example.com',
		text: 'Hey! how you doing'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});