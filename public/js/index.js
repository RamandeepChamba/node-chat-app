var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var li = jQuery('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My location</a>');
	var formattedTime = moment(message.createdAt).format('h:mm a');

	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	
	li.append(a);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {

	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');
	var message = messageTextbox.val();
	socket.emit('createMessage', { from: 'User', text: message }, function() {
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {

	if(!navigator.geolocation) {
		return alert('Geolocation is not supported in your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit('createLocationMessage', { 
			latitude: position.coords.latitude, 
			longitude: position.coords.longitude 
		}, function() {
			locationButton.removeAttr('disabled').text('Send location');
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});