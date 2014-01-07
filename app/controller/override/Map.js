/**
 * OVERRIDE MAP
 */
Ext.define('pvBiz.controller.override.Map', {
    override: 'Ext.Map',

	updateMapOptions: function(newOptions) {
        var me = this,
            gm = (window.google || {}).maps,
            map = this.getMap();

        if (gm && map) {
            map.setOptions(newOptions);
        }
        if (newOptions.center && !me.isPainted()) {
            me.un('painted', 'setMapCenter', this);
            me.on('painted', 'setMapCenter', this, { delay: 150, single: true, args: [newOptions.center] });
        }
    },

	setMapCenter: function(coordinates) {
        var me = this,
            map = me.getMap(),
            gm = (window.google || {}).maps;

        if (gm) {
            if (!me.isPainted()) {
                me.un('painted', 'setMapCenter', this);
                me.on('painted', 'setMapCenter', this, { delay: 150, single: true, args: [coordinates] });
                return;
            }
            coordinates = coordinates || new gm.LatLng(20.6034, -105.23370); // Puerto Vallarta

            if (coordinates && !(coordinates instanceof gm.LatLng) && 'longitude' in coordinates) {
                coordinates = new gm.LatLng(coordinates.latitude, coordinates.longitude);
            }

            if (!map) {
                me.renderMap();
                map = me.getMap();
            }

            if (map && coordinates instanceof gm.LatLng) {
                map.panTo(coordinates);
            }
            else {
                this.options = Ext.apply(this.getMapOptions(), {
                    center: coordinates
                });
            }
        }
    }
});
