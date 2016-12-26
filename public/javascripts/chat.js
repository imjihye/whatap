(function($){
	// $(function(){
	// });
	$(document).ready(function(){
	    var socket = io.connect('http://localhost:3033');

        $('#welcome').text('welcome chat~!');

        $('#enter').off().on('click', function(e){
	        socket.emit('join', 
	            {'user': $('#user').val(), 'roomname': $('#roomname').val()}
	        );

	        $('#log').hide();
	        $('#chat').show();
	    });

	    $('#btn').off().on('click', function(e){

			socket.emit('send', 
				{'user': $('#user').val(), 'message': $('#txt').val()}
			);

		    $('#txt').val('');
	    });

	    socket.on('join message', function(data){
        	$('#txtappend').append('<dd style="margin:0px;">welcome: ' + data.user + '</dd>');
    		var html='';
    		data.userlist.map(function(item){
        		html += '<li style="margin:0px;">' + item + '</li>';
    		});
        	$('#userlist').html(html);
	    });

	    socket.on('send message', function(data){
    		console.log('send message')

	        $('#txtappend').append('<dd style="margin:0px;">'  + data.user + ': ' + data.message + '</dd>');
	    });

		socket.on('leave', function(data){
			//remove userlist
			$('#txtappend').append('<dd style="margin:0px;">leave: '  + data + '</dd>');
		});
    });
})(jQuery);