/**
 * Google Map with geoMarker and directions
 */
Ext.define("pvBiz.view.PlacesMap", {
	extend: 'Ext.Map',
	alias: 'widget.placesmap',
	xtype: 'placesmap',

	config: {
		itemId:                    'placesMap',
		layout:                    'fit',
		mapOptions: {
			zoom:                  17,
			zoomControl:           true,
			mapTypeControl:        false,
			streetViewControl:     false,
			mapTypeId:             google.maps.MapTypeId.ROADMAP
		},
        listeners: {
            maprender: function() {
                var me = Ext.Viewport.down('map');
                console.log('maprender');
                if (me && me._pvBiz_location)
                    Ext.defer(function() {
                        me.setMapCenter(me._pvBiz_location);
                        me.marker = me.marker || new google.maps.Marker();
                        me.marker.setPosition(me._pvBiz_location);
                        me.marker.setMap(me.getMap());
                    }, 100, this);
            }
        }
	},
    
    setData: function(data) {
        this._pvBiz_location = new google.maps.LatLng(data.list_latitude, data.list_longitude)
        if (this.isRendered()) {
            this.setMapCenter(new google.maps.LatLng(data.list_latitude, data.list_longitude));
        }
    }
});
