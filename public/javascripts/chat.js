(function($){
	// $(function(){
	// });
	$(document).ready(function(){
	    var socket = io();

        $('#welcome').text('welcome chat~!');

        $("#user").keydown(function(event) {
	        if (event.which == 13) {
	        	if($('#user').val() === '') {
	        		alert('please user name..');
	        		return;
	        	}
	            socket.emit('join',
	            	{'user': $('#user').val(), 'roomname': $('#roomname').val()}
            	);
		        $('#log').hide();
		        $('#chat').show();
	        	event.preventDefault();
	        }
        });

        $('#enter').off().on('click', function(e){
        	if($('#user').val() === '') {
        		alert('please user name..');
        		return;
        	}

	        socket.emit('join', 
	            {'user': $('#user').val(), 'roomname': $('#roomname').val()}
	        );

	        $('#log').hide();
	        $('#chat').show();
	    });


        $("#txt").keydown(function(event) {
	        if (event.which == 13) {
	        	if($('#txt').val() === '') {
	        		return false;
	        	}
	            socket.emit('send',
	            	{'user': $('#user').val(), 'message': $('#txt').val()}
            	);
	            $('#txt').val('');
	        	event.preventDefault();

	        }
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
	        $('#txtappend').append('<dd style="margin:0px;">'  + data.user + ': ' + data.message + '</dd>');
	    });

		socket.on('leave', function(data){
			var html = '';
			data.userlist.map(function(item){
        		html += '<li style="margin:0px;">' + item + '</li>';
    		});
        	$('#userlist').html(html);
			
			$('#txtappend').append('<dd style="margin:0px;">leave: '  + data.user + '</dd>');
		});
    });
})(jQuery);