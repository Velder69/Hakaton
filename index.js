// Map settings manager
let M = {
    AppId: 'aersyuCBIlTEN1WM2VGu',
    AppCode: 'r13p1Y7dafTAiPFjOahwrg',
    Lat: 45.03992548,
    Lng: 38.978408312,
    Zoom: 13,
    TileLayerUrl: {}
}

// Base Map
M.TileLayerUrl = (style) => `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=aersyuCBIlTEN1WM2VGu&app_code=r13p1Y7dafTAiPFjOahwrg&ppi=320&lg=rus`

const map = L.map('map').setView([M.Lat, M.Lng], M.Zoom)

L.tileLayer(M.TileLayerUrl('reduced.day')).addTo(map)

// Url for downloading data
let geoDataUrl = 'https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk'

let isolineUrl = `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${M.AppId}&app_code=${M.AppCode}&jsonattributes=41&mode=shortest;pedestrian&quality=1&range=1800&rangetype=time&start=geo!45.03992548,38.978408312`

let realTimeLayer = `https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk`

fetch(geoDataUrl).then(res => {
    res.json().then(data => {
        L.geoJSON(data, {
            pointToLayer: function(geoJsonPoint, latlng) {
                return L.circleMarker(latlng, {radius:5, color:'orange'})
            }
        }).addTo(map)
    })
})

fetch(isolineUrl).then(res => {
    res.json().then(data => {
        let splitArray = (array, part) => {
            var tmp = []
            for(var i = 0; i < array.length; i += part) {
                tmp.push(array.slice(i, i + part));
            }
            return tmp;
        }
        L.polygon(splitArray(data.response.isoline[0].component[0].shape,2),{color: 'green'}).addTo(map)
    })
})

L.realtime(realTimeLayer, {
    interval: 1 * 1000,
    getFeatureId: function(f) {
        return f.id;
    }
}).addTo(map)