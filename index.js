// Map settings manager
let M = {
    'AppId': 'aersyuCBIlTEN1WM2VGu',
    'AppCode': 'r13p1Y7dafTAiPFjOahwrg',
    'Lat' : 45.03992548,
    'Lng' : 38.978408312,
    'Zoom' : 13,
    'TileLayerUrl': {}
}

// Base Map
M.TileLayerUrl = (style) => `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=aersyuCBIlTEN1WM2VGu&app_code=r13p1Y7dafTAiPFjOahwrg&ppi=320&lg=rus`

const map = L.map('map').setView([M.Lat, M.Lng], M.Zoom)

L.tileLayer(M.TileLayerUrl('reduced.day')).addTo(map)

// Url for downloading data
let geoDataUrl = 'https://xyz.api.here.com/hub/spaces/5mOuzXWl/iterate?access_token=AfL648ZDVfGrDXdjz4aNQDs'

let realTimeLayer = `https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk`

L.realtime(realTimeLayer, {
    interval: 1 * 1000,
    getFeatureId: function(f) {
        return f.id;
    }
}).addTo(map)