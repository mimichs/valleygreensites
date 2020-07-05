var wms_layers = [];


        var lyr_OSMHumanitarian_0 = new ol.layer.Tile({
            'title': 'OSM Humanitarian',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png, http://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png, http://tile-c.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            })
        });
var format_GreenSites_1 = new ol.format.GeoJSON();
var features_GreenSites_1 = format_GreenSites_1.readFeatures(json_GreenSites_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GreenSites_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GreenSites_1.addFeatures(features_GreenSites_1);
var lyr_GreenSites_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_GreenSites_1, 
                style: style_GreenSites_1,
                interactive: true,
                title: '<img src="styles/legend/GreenSites_1.png" /> GreenSites'
            });

lyr_OSMHumanitarian_0.setVisible(true);lyr_GreenSites_1.setVisible(true);
var layersList = [lyr_OSMHumanitarian_0,lyr_GreenSites_1];
lyr_GreenSites_1.set('fieldAliases', {'Name': 'Name', 'Group': 'Group', 'Category': 'Category', 'Year': 'Year', 'Address': 'Address', 'Website': 'Website', });
lyr_GreenSites_1.set('fieldImages', {'Name': 'TextEdit', 'Group': 'TextEdit', 'Category': 'TextEdit', 'Year': 'TextEdit', 'Address': 'TextEdit', 'Website': 'TextEdit', });
lyr_GreenSites_1.set('fieldLabels', {'Name': 'inline label', 'Group': 'inline label', 'Category': 'inline label', 'Year': 'inline label', 'Address': 'inline label', 'Website': 'inline label', });
lyr_GreenSites_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});