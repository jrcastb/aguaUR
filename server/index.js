const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io  = socketIO.listen(server);

app.use(express.static(__dirname + '/public'));


server.listen(3000, function(){
	console.log('server listening on port', 3000);
});

const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;

const port = new Serialport('/dev/ttyUSB0', {
	baudRate:9600
});

const parser = port.pipe(new Readline({delimeter: '\r\n'}));

parser.on('open', function (){
	console.log('Conexión abierta');
});
parser.on('data', function(data){
	let data0 = data[0]+data[1];
	let data1 = data[2]+data[3];
	//enviar el dato en entero para que sea recibido correctamente
	let distancia = parseInt(data0, 10);
	let distancia_2 ="Distancia_2: " + parseInt(data1, 10) + " Cm";
	//console.log(distancia,distancia_2);
	const distanciaE1 = io.emit('distancia', distancia);
	const distanciaE2 = io.emit('distancia2', distancia_2);
});
port.on('error', function(){
	console.log(err)
})
