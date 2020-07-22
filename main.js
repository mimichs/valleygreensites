window.onload = init;  /*only calls the function when the window is loaded */

function init(){ 
 
    // create variable for map //
    
 const map = new ol.Map({                   
    view: new ol.View({
        center: [26884770.51850656, 4052602.3660282493],    
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

 // drop pins

 const strokeStyle = new ol.style.Stroke({
    color: [45, 45, 45, 1],
    width: 1.2
 })

 const pinStyle = new ol.style.Icon({
    scale: 0.6,
    src: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png'
 })

 const SitesGeoJSON = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: './data/sites.geojson', //this is the geojson file //
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: 'Sites',
    style: new ol.style.Style({
        stroke: strokeStyle,
        image: pinStyle
    })
 })
    map.addLayer(SitesGeoJSON)
   
 map.on('click', function(e){    /* calls js coordinates in console when clicked */
    console.log(e.coordinate)
    console.log(ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326'));
 })

 // Vector Feature Popup Logic

 const overlayContainerElement = document.querySelector('.overlay-container');
 const overlayLayer = new ol.Overlay({
     element: overlayContainerElement
 })

 map.addOverlay(overlayLayer);
 const overlayFeatureName = document.getElementById('Name');
 const overlayFeatureCategory = document.getElementById('Category')

 map.on('click', function(e){
   overlayLayer.setPosition(undefined);
   map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
       let clickedCoordinate = e.coordinate;
       let clickedFeatureName = feature.get('Name');
       let clickedFeatureCategory = feature.get('Category');
       overlayLayer.setPosition(clickedCoordinate);
       overlayFeatureName.innerHTML = clickedFeatureName;
       overlayFeatureCategory.innerHTML = clickedFeatureCategory;
   })
 })

}

