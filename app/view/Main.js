Ext.define('pvBiz.view.Main', {
    extend:   'Ext.tab.Panel',
    xtype:    'main',
    
    config: {
        tabBarPosition: 'bottom',
        
        tabBar: {
            scrollable: {
                direction: 'horizontal',
                indicators: null
            }
        },
        
        items: [{
            xtype:      'home',
            title:      'home',
            iconCls:    'home',
            scrollable: 'vertical',
        },{
            xtype:      'placesinfo',
            title:      'info',
            iconCls:    'info',
            scrollable: 'vertical',
            enableLocale: true,
            hidden:     true,
            locales :     { title : 'tab.info' }
        },{
            itemId:     'Photo',
            xtype:      'photos',
            iconCls:    'photos',
            title:      'photos',
            hidden:     true,
            enableLocale: true,
            locales :     { title : 'tab.photos' }
        },{
            xtype:      'placesevents',
            title:      'events',
            iconCls:    'time',
            scrollable: 'vertical',
            enableLocale: true,
            hidden:     true,
            locales :     { title : 'tab.events' }
        },{
            itemId:     'Menu',
            indicator:  true,
            xtype:      'photos',
            iconCls:    'list',
            title:      'menu',
            hidden:     true,
            //enableLocale: true,
            //locales :     { title : 'tab.menu' }
        },{
            xtype:      'placesmap',
            title:      'map',
            iconCls:    'browser',
            enableLocale: true,
            hidden:     true,
            locales :     { title : 'tab.map' }
        },{
            xtype:      'settings',
            title:      'settings',
            iconCls:    'settings',
            enableLocale: true,
            locales :     { title : 'tab.settings' }
        }]
    },
    
    loadViewsData: function(data) {
        
        var main     = Ext.Viewport.down('main'),
            tabbar   = main.down('tabbar'),
            home     = Ext.Viewport.down('home'),
            photos   = Ext.Viewport.down('pinchimagecarousel'),
            info     = Ext.Viewport.down('placesinfo'),
            events   = Ext.Viewport.down('placesevents'),
            map      = Ext.Viewport.down('placesmap'),
            menu     = Ext.Viewport.down('#Menu'),
            eventsA  = [];
        
        // load each view
        //
        info   && info.setData(data);
        events && events.setData(data);
        map    && map.setData(data);
        photos && photos.setData(data, 'photos');
        menu   && menu.setData(data, 'menu');
        
        if (!data.eventsArray.length  && events)
            tabbar.getComponent(3).hide()
        else
            tabbar.getComponent(3).show()
            
        if (photos && !photos.getInnerItems().length)
            tabbar.getComponent(2).hide()
        else
            tabbar.getComponent(2).show()
            
        if (menu && !menu.getInnerItems().length)
            tabbar.getComponent(4).hide()
        else
            tabbar.getComponent(4).show()
            
        if (!data.list_latitude && map)
            tabbar.getComponent(5).hide()
        else
            tabbar.getComponent(5).show()
            
        tabbar.getComponent(1).show()
            
        main.setActiveItem(info);
        //list.deselect(record);
        
    }
});
