window.onload = init;  /*only calls the function when the window is loaded */

function init(){ 
 
// create variable for map //
    
 const map = new ol.Map({                   
    view: new ol.View({
        center: [26881609.857750453, 4056940.108146491],    
        zoom: 11.5
    }),
    target: 'js-map'
 })

//basemaps layers

const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: false,
    title: 'OSM Standard'
   })

 const openStreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
       }),
    visible: false,
    title: 'OSM Humanitarian'
   })

 const stamenTerrain = new ol.layer.Tile({
   source: new ol.source.XYZ({
       url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
       attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>',
   }),
   visible: true,
   title: 'Stamen Terrain'
  })

  const owmtrue = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://{s}.sat.owm.io/sql/{z}/{x}/{y}?from=s2&APPID={3fb7417e92fc63544bd206a959d2fd25}',
        attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>',
    }),
    visible: true,
    title: 'OWM True'
   })

 //layer group 
 const baseLayerGroup = new ol.layer.Group({
    layers: [
        stamenTerrain, openStreetMapStandard, openStreetMapHumanitarian, owmtrue
    ]
  })

  map.addLayer(baseLayerGroup);

  //Layer switcher logic for basemaps
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
  for(let baseLayerElement of baseLayerElements){
      baseLayerElement.addEventListener('change', function(){
          let baseLayerElementValue= this.value; //'this' comes from function
          baseLayerGroup.getLayers().forEach(function(element,index,array){
              let baseLayerTitle= element.get('title');
              element.setVisible(baseLayerTitle === baseLayerElementValue);
         }) //returns collection
      })
  }


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
    
 })

 // Vector Feature Popup Logic

 const overlayContainerElement = document.querySelector('.overlay-container');
 const overlayLayer = new ol.Overlay({
     element: overlayContainerElement
 })

 map.addOverlay(overlayLayer);
 const overlayFeatureName = document.getElementById('Name');
 const overlayFeatureDescription = document.getElementById('Description');
 const overlayFeatureWebsite = document.getElementById('Website')

 map.on('click', function(e){
   overlayLayer.setPosition(undefined);
   map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
       let clickedCoordinate = e.coordinate;
       let clickedFeatureName = feature.get('Name');
       let clickedFeatureDescription = feature.get('Description');
       let clickedFeatureWebsite = feature.get('Website');
       overlayLayer.setPosition(clickedCoordinate);
       overlayFeatureName.innerHTML = clickedFeatureName;
       overlayFeatureDescription.innerHTML = clickedFeatureDescription;
       overlayFeatureWebsite.innerHTML = clickedFeatureWebsite;
   })
 })
}

