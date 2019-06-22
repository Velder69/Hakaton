var platform = new H.service.Platform({
  'app_id': 'aersyuCBIlTEN1WM2VGu',
  'app_code': 'r13p1Y7dafTAiPFjOahwrg'
  });

/*var xhr = new XMLHttpRequest();
// 2. Конфигурируем его: GET-запрос на URL
xhr.open('GET', 'https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk');
xhr.send();
var searchVolunteers = JSON.parse(xhr.responseText);

var coordinates = {
  lat: searchVolunteers.features.geometry.coordinates[0],
  lng: searchVolunteers.features.geometry.coordinates[1]
}*/

  // получить типы карт по умолчанию из объекта платформы
var maptypes = platform.createDefaultLayers();

var coordinates = {
  lat: 38.978408312,
  lng: 45.03992548
};

// cоздание (и отображение) объекта карты
var map = new H.Map(
  document.getElementById('mapContainer'),
  maptypes.normal.map,
  {zoom: 5, center: coordinates
    //{lat: coordinates.lat,
    //lng: coordinates.lng
    //}
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

//var mapEvents = new H.mapevents.MapEvents(map);

//var behavior = new H.mapevents.Behavior(mapEvents)

geocoder.geocode(map, onResult, function(e) {
  alert(e);
});

// Create the default UI:
var ui = H.ui.UI.createDefault(map, maptypes, 'ru-RU');

let realTimeLayer = `https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk`

L.realtime(realTimeLayer, {
  interval: 1 * 1000,
  getFeatureId: function(f) {
      return f.id;
  }
}).addTo(map)