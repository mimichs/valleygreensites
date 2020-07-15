window.onload = init;                       /*only calls the function when the window is loaded */

function init(){ 
 const map = new ol.Map({                   /* create variable for map */
    view: new ol.View({
        center: [26884770.51850656, 4052602.3660282493],    /* x,y coordinates */ 
        zoom: 11.5
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
               })
        })
    ],
    target: 'js-map'
 })

 const strokeStyle = new ol.style.Stroke({
    color: [45, 45, 45, 1],
    width: 1.2
 })

 const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
        color: [245,49,5,1]
    }),
    radius: 7,
    stroke: strokeStyle
 })

 const SitesGeoJSON = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: './data/map.geojson',
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'Sites',
    style: new ol.style.Style({
        image: circleStyle
    })
 })
    map.addLayer(SitesGeoJSON)
}

