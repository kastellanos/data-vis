function drawChart(){
	var options = {'title':'Armas utilizadas para robos 2017 Enero-Marzo',
	   'width':550,
	   'height':400};
	  $.get("resources/vis2/data.csv",function(csvString){
	  	var d = $.csv.toArrays(csvString,{onParseValue: $.csv.hooks.castToScalar});
	  	console.log(d);
	  	var data = new google.visualization.arrayToDataTable(d);
	  	data.setColumnLabel(1,"Total armas usadas")
	  	var chart = new google.visualization.PieChart(document.getElementById('chart'));
		chart.draw(data, options);
	  })
}
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);