/**
 *
 */
Ext.define("pvBiz.store.Main", {
	extend: "Ext.data.Store",
    requires: ['Ext.data.proxy.JsonP'],

	config: {
		storeId:     'mainstore',
		model:       'pvBiz.model.Business',
		autoLoad:    false,

        proxy: {
			type:      'jsonp',
			url:       'http://www.gayguidevallarta.com/ajax/json.listing.php',

			enablePagingParams: false,
			timeout:            35000,
			noCache :           false,
            
			reader: {
				type:           'json',
				rootProperty:   'MAIN_LISTINGS'
			},
            
			listeners: ({
				exception: function() {
					return false;
				}
			})
		},
        
        listeners: {
            load: function(store, records, success) {
                var photos   = Ext.Viewport.down('pinchimagecarousel'),
                    info     = Ext.Viewport.down('placesinfo'),
                    events   = Ext.Viewport.down('placesevents'),
                    map      = Ext.Viewport.down('placesmap'),
                    menu     = Ext.Viewport.down('#Menu'),
                    record   = records[0],
                    data     = record.getData(),
                    eventsA  = [];
                        
                // prepare associated event info 
                //
                Ext.each(record.events().getRange(0), function(model, index) {
                    var datum = model.getData();
                    eventsA.push(datum);
                });
                data.eventsArray = eventsA;
                
                // load each view
                //
                info &&info.setData(data);
                events && events.setData(data);
                map && map.setData(data);
                photos && photos.setData(data, 'photos');
                menu && menu.setData(data, 'menu');
                
                if (!data.eventsArray.length  && events)
                    events.destroy();
                    
                if (photos && !photos.getInnerItems().length)
                    photos.destroy();
                    
                if (menu && !menu.getInnerItems().length)
                    menu.destroy();
                    
                if (!data.list_latitude && map)
                    map.destroy();
            }
        }
	}
});
