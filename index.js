var net = require('net');

var server = net.createServer();    

server.listen(14882, function(){    
	console.log('server listening to %j', server.address());  
});

server.on('connection', (conn) => {    
	var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
	console.log('new client connection from %s', remoteAddress);

	conn.on('data', (d) => {  
		console.log('connection data from %s: %j', remoteAddress, d);  
		conn.write(d);  
	});

	conn.once('close', () => {
		console.log('connection from %s closed', remoteAddress);  
	});
	
	conn.on('error', (err) => {
		console.log('Connection %s error: %s', remoteAddress, err.message);
	});
});