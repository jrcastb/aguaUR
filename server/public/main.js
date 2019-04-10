
const socket = io();
let counter = 0;
socket.on('distancia', function(dataSerial){
	console.log(dataSerial);
	myChart.data.labels.push(counter);
	myChart.data.datasets.forEach(dataset => {
		dataset.data.push(dataSerial);
	});
	counter++;
	myChart.update();
	let nivelUno = document.querySelector('.nivel-uno');
//	nivelUno.innerHTML = dataSerial;
	nivelUno.style.height = (dataSerial)+'%';
});
socket.on('distancia2', function(dataSerial){
	console.log(dataSerial);
//	let distancia2 = document.querySelector('#distancia2');
//	distancia2.innerHTML = dataSerial;
});

var ctx = document.querySelector("#Grafica").getContext("2d");
var myChart = new Chart(ctx, {
	type: 'line',
        data: {
		labels: ["Serial"],
		datasets: [{
			label:"Distancia",
			backgroundColor: 'rgba(255, 255, 255, 0)',
			borderColor: 'rgb(52, 73, 94)',
			data: []
		}]
	},
	options: {}
});

