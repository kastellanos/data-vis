function initMap() {
    var myLatLng = {lat: 4.580249, lng: -74.136831};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
        center: myLatLng
    });
    var image = '/gm/resources/vis3/datosdc.png';
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}