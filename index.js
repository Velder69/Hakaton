var platform = new H.service.Platform({
  'app_id': 'aersyuCBIlTEN1WM2VGu',
  'app_code': 'r13p1Y7dafTAiPFjOahwrg'
  });

var infoFromDataBase = JSON.parse('{"isError":false,"data":{"response":{"metaInfo":{"timestamp":"2019-06-22T14:08:30Z","mapVersion":"8.30.97.151","moduleVersion":"7.2.201923-3839","interfaceVersion":"2.6.58","availableMapVersion":["8.30.97.151"]},"center":{"latitude":45.020261,"longitude":39.03071},"isoline":[{"range":350,"component":[{"id":0,"shape":[45.0214577,39.0267849,45.0219727,39.0268707,45.0224876,39.0270424,45.0226593,39.0275574,45.0226593,39.0289307,45.022831,39.0294456,45.0231743,39.029789,45.0233459,39.030304,45.0233459,39.0309906,45.0231743,39.0315056,45.0221443,39.0318489,45.021801,39.0321922,45.0214577,39.0321922,45.020771,39.0315056,45.0204277,39.0304756,45.0187111,39.028759,45.0187111,39.0284157,45.020771,39.0263557,45.0211143,39.0262699,45.0214577,39.0267849]}]}],"start":{"linkId":"+986132138","mappedPosition":{"latitude":45.0209899,"longitude":39.0303426},"originalPosition":{"latitude":45.020261,"longitude":39.03071}},"time":178,"serverTime":"5470"}},"statusCode":200}')

var coordinates = {
  lat: infoFromDataBase.data.response.center.latitude,
  lng: infoFromDataBase.data.response.center.longitude
};

  // получить типы карт по умолчанию из объекта платформы
var maptypes = platform.createDefaultLayers();

// cоздание (и отображение) объекта карты
var map = new H.Map(
  document.getElementById('mapContainer'),
  maptypes.normal.map,
  {zoom: 15, center: {
    lat: coordinates.lat,
    lng: coordinates.lng
    }
  }
);

var onResult = function() {
  // Add a marker for each location found
  position = {
    lat: coordinates.lat,
    lng: coordinates.lng
  };
  marker = new H.map.Marker(position);
  map.addObject(marker);
  };

var geocoder = platform.getGeocodingService();

geocoder.geocode(map, onResult, function(e) {
  alert(e);
});

// Create the default UI:
var ui = H.ui.UI.createDefault(map, maptypes, 'ru-RU');