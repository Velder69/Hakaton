let paramForPoligon = {
    range: 1800,
    rangetype: 'time',
    coordLat: 45.03992548,
    coordLng: 38.978408312
}

let M = {
    AppId: 'aersyuCBIlTEN1WM2VGu',
    AppCode: 'r13p1Y7dafTAiPFjOahwrg',
    Lat: 45.03992548,
    Lng: 38.978408312,
    Zoom: 13,
    TileLayerUrl: {},
    n: 6
}

var s = [
    45.0418854,38.9658451,
    45.0465202,38.9748573,
    45.0472069,38.9834404,
    45.0372505,38.9896202,
    45.0322723, 38.9781189
]

// Base Map
M.TileLayerUrl = (style) => `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=aersyuCBIlTEN1WM2VGu&app_code=r13p1Y7dafTAiPFjOahwrg&ppi=320&lg=rus`

const map = L.map('map').setView([M.Lat, M.Lng], M.Zoom)

L.tileLayer(M.TileLayerUrl('reduced.day')).addTo(map)

// Url for downloading data
let geoDataUrl = 'https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk'

let isolineUrl = `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${M.AppId}&app_code=${M.AppCode}&jsonattributes=41&mode=shortest;pedestrian&quality=1&range=${paramForPoligon.range}&rangetype=${paramForPoligon.rangetype}&start=geo!${paramForPoligon.coordLat},${paramForPoligon.coordLng}`

let realTimeLayer = `https://xyz.api.here.com/hub/spaces/Is6F8I6R/iterate?access_token=ADjlTElHM7DEaLww1vbJckk`

fetch(geoDataUrl).then(res => {
    res.json().then(data => {
        L.geoJSON(data, {
            pointToLayer: function(geoJsonPoint, latlng) {
                return L.circleMarker(latlng, {radius:0, color:'blue'})
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


function fixWhich() {
    let range2 = paramForPoligon.range-Math.round((paramForPoligon.range)/Math.sqrt(M.n));
    let range1 = Math.round((2.4*range2)/Math.sqrt(M.n));

    for (var j = 0; j < s.length; j += 2){

        let isolineUrl1 = `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${M.AppId}&app_code=${M.AppCode}&jsonattributes=41&mode=shortest;pedestrian&quality=1&range=${range1}&rangetype=time&start=geo!${s[j]},${s[j+1]}`

        fetch(isolineUrl1).then(res => {
            res.json().then(data => {
                let splitArray = (array, part) => {
                    let tmp = []
                    for(var i = 0; i < array.length; i += part*Math.round((array.length/(part*M.n-1)))) {
                    tmp.push(array.slice(i, i + part));
                }
                return tmp;
                }
            L.polygon(splitArray(data.response.isoline[0].component[0].shape,2),{color: "red"}).addTo(map)
            })
        })
    }
}