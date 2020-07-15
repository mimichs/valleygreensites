window.onload = init;                       /*only calls the function when the window is loaded */

function init(){ 
 const map = new ol.Map({                   /* create variable for map */
    view: new ol.View({
        center: [-8384387.131913411, -1191606.8728746534],    /* x,y coordinates */ 
        zoom: 5,
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

 //layer group 
 const baseLayerGroup = new ol.layer.Group({
    layers: [
        openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
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

  //Vector Layers
  
  const fillStyle = new ol.style.Fill({
      color: [84, 118,, 255, 1]
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


  const EUCountriesGeoJSON = new ol.layer.VectorImage({
      source: new ol.source.Vector({
          url: './OpenLayers/data/vector data/EUCountries.geojson',
          format: new ol.format.GeoJSON()
      }),
      visible: true,
      title: 'EUCountriesGeoJSON',
      style: new ol.style.Style({
          fill: fillStyle,
          stroke: strokeStyle,
          image: circleStyle
      })
  })

  map.addLayer(EUCountriesGeoJSON)

  // Vector Feature Popup Logic

  const overlayContainerElement = document.querySelector('.overlay-container');
  const overlayLayer = new ol.Overlay({
      element: overlayContainerElement
  })

  map.addOverlay(overlayLayer);
  const overlayFeatureName = document.getElementById('feature-name');
  const overlayFeatureAdditionalInfo = document.getElementById('feature-additionalinfo')

  map.on('click', function(e){
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
        let clickedCoordinate = e.coordinate;
        let clickedFeatureName = feature.get('name');
        let clickedFeatureAdditionalInfo = feature.get('additionalinfo');
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureAdditionalInfo.innerHTML = clickedFeatureAdditionalInfo;
    })
  })

}