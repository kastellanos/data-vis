function initMap() {
    var myLatlng = {lat: 4.570548, lng: -74.133559};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatlng,
        zoom: 15
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click to zoom'
    });

    map.addListener('center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
            map.panTo(marker.getPosition());
        }, 3000);
    });

    marker.addListener('click', function() {
        //alert("Estamos cerca de la casa de la cultura de Tunjuelito");
        $('#loc').modal({
            show: 'true'
        });
    });
}