function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function build_chart( s ){
    Papa.parse(s, {
        download: true,
        complete: function(results) {

            var ctx = document.getElementById("chart").getContext("2d");

            dt = []
            lb = []
            cl = []
            for(var i = 1;i<results.data.length; i++){
                console.log(results.data[i][0]);
                lb.push( results.data[i][0]);
                dt.push( results.data[i][1]);
                cl.push( getRandomColor());
            }

            var config = {
                type: 'bar',
                data: {
                    datasets: [{
                        data: dt,
                        backgroundColor: cl,
                        label: 'Dataset 1'
                    }],
                    labels: lb
                },
                options: {
                    responsive: true
                }
            };
            window.myBar = new Chart(ctx, config);
        }
    });
}

window.onload = function() {
    build_chart( "resources/vis2/data.csv" )
};