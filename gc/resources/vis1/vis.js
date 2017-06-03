function drawChart(){
	var options = {'title':'Frecuenca de letras en el idioma ingles',
	   'width':550,
	   'height':400};
	  $.get("resources/vis1/data.csv",function(csvString){
	  	var d = $.csv.toArrays(csvString,{onParseValue: $.csv.hooks.castToScalar});
	  	console.log(d);
	  	var data = new google.visualization.arrayToDataTable(d);
	  	var chart = new google.visualization.BarChart(document.getElementById('chart'));
		chart.draw(data, options);
	  })
}
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);