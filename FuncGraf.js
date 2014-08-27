//Esta es una mezcla de código obtenido de http://en.wikipedia.org/wiki/Ajax_(programming) para hacer el request a Facebook y http://bl.ocks.org/tpreusse/2bc99d74a461b8c0acb1 para generar el gráfico


//Arreglo para almacenar los datos necesarios para el gráfico
var data = [];

//Función que se llama cuando se presiona el botón "Enviar"
function generatePlot()
{
	//Obtenemos el FacebookID desde el input con id fbid
	var fbid = document.getElementById("fbid").value;
	
	//Obtenemos el Token desde el input con id token
	var token = document.getElementById("token").value;
	
	//Campos que queremos obtener con la consulta
	var fields = "name,likes.limit(1000),photos.limit(1000),statuses.limit(1000),friends"

	//Consulta
	var req = "https://graph.facebook.com/v1.0/" + fbid + "?access_token=" + token + "&fields=" + fields + "&format=json&method=get&pretty=0&suppress_http_code=1"


	//Creamos una nueva variable para manejar la consulta
	
	var xhr = new XMLHttpRequest();

	//En req tiene que estar almacenada la consulta
	xhr.open('get', req);
	 
	//Suscribimos la siguiente función al evento "cambio de estado" de la variable que maneja la consulta.
	 xhr.onreadystatechange = function(){
		// Ready state 4 means the request is done
		if(xhr.readyState === 4){
			// 200 is a successful return
			//Este es el código que se ejecutará una vez que la consulta sea respondida sin problemas
			if(xhr.status === 200){
			
				//En xhr.responseText está la respuesta. En este caso es en JSON así que la parseamos para transformarla a un objeto javascript
				var response = JSON.parse(xhr.responseText);
				
				//Obtenemos la cantidad de amigos, likes, fotos y estados.
				var friends = response.friends.data.length;
				var likes = response.likes.data.length;
				var photos = response.photos.data.length;
				var statuses = response.statuses.data.length;
				
				//Agregamos al arreglo	los datos obtenidos en el formato indicado por el creador de la librería para poder agregar los datos al gráfico
				data.push(
				  {
					axes: [
					  {axis: "likes", value: likes}, 
					  {axis: "photos", value: photos}, 
					  {axis: "friends", value: friends},  
					  {axis: "statuses", value: statuses}
					]
				  }
				);
				
				//Usamos el método de la librería para crear el gráfico e insertarlo en el div de clase "chart-container"
				RadarChart.draw(".chart-container", data);
				document.write(data);
			}else{
				alert('Error: '+xhr.status); // An error occurred during the request
			}
		}
	}
	 
	//Enviamos la consulta
	xhr.send(null);
}