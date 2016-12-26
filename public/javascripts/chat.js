(function($){
	// $(function(){
	// });
	$(document).ready(function(){
	    var socket = io.connect('http://localhost:3033');

        $('#welcome').text('welcome chat~!')

        $('#enter').off().on('click', function(e){
	        socket.emit('join', 
	            {'user': $('#user').val(), 'roomname': $('#roomname').val()}
	        );

		    socket.on('join message', function(data){
	        	$('#txtappend').append('<dd style="margin:0px;">welcome: ' + data.user + '</dd>');
		    });

	        $('#log').hide();
	        $('#chat').show();
	    });

	    $('#btn').off().on('click', function(e){
			socket.emit('send', 
				{'user': $('#user').val(), 'message': $('#txt').val()}
			);

		    socket.on('send message', function(data){
		        $('#txtappend').append('<dd style="margin:0px;">'  + data.user + ': ' + data.message + '</dd>');
		    });

		    $('#txt').val('');
	    });

		socket.on('leave', function(data){
			$('#txtappend').append('<dd style="margin:0px;">leave: '  + data + '</dd>');
		});
    });
})(jQuery);