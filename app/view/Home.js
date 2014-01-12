Ext.define('pvBiz.view.Home', {
    extend:   'Ext.dataview.List',
    xtype:    'home',
    
    config: {
        store:   'mainstore',
        itemTpl: ['{list_name}'],
        ui:      'round',
        listeners: {
            select: function(list, record) {
                var main     = list.up('main'),
                    data     = record.getData(),
                    eventsA  = [];
                
                Ext.each(record.events().getRange(0), function(model, index) {
                    var datum = model.getData();
                    eventsA.push(datum);
                });
                data.eventsArray = eventsA;
                
                // load each view
                //
                main.loadViewsData(data);
                list.deselect(record);
            }
        }
    }
});
