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
                
                Ext.Viewport.setMasked(false);
                var main     = Ext.Viewport.down('main'),
                
                    tabbar   = main.down('tabbar'),
                    home     = Ext.Viewport.down('home'),
                    info     = Ext.Viewport.down('placesinfo'),
                    record   = records[0],
                    data     = record.getData(),
                    eventsA  = [];

                if (records.length > 0) {
                    // prepare associated event info 
                    //

                    if (records.length == 1) {
                        // prepare associated event info 
                        //
                        Ext.each(record.events().getRange(0), function(model, index) {
                            var datum = model.getData();
                            eventsA.push(datum);
                        });
                        data.eventsArray = eventsA;
    
                        main.loadViewsData(data);
                        main.setActiveItem(info);
                        tabbar.getComponent(0).hide()
                    }
                    else {
                        main.setActiveItem(home);
                        tabbar.getComponent(0).show();
                    }
                }
            }
        }
	}
});
