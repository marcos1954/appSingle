Ext.define('pvBiz.view.Main', {
    extend:   'Ext.tab.Panel',
    xtype:    'main',
    requires: [],
    
    config: {
        tabBarPosition: 'bottom',
        
        tabBar: {
            scrollable: 'horizontal'
        },
        
        items: [{
            xtype:      'placesinfo',
            title:      'info',
            iconCls:    'info',
            scrollable: 'vertical',
            enableLocale: true,
            locales :     { title : 'tab.info' }
        },{
            itemId:     'Photo',
            xtype:      'photos',
            iconCls:    'photos',
            title:      'photos',
            enableLocale: true,
            locales :     { title : 'tab.photos' }
        },{
            xtype:      'placesevents',
            title:      'events',
            iconCls:    'time',
            scrollable: 'vertical',
            enableLocale: true,
            locales :     { title : 'tab.events' }
            
            
        },{
            itemId:     'Menu',
            indicator:  true,
            xtype:      'photos',
            iconCls:    'list',
            title:      'menu',
            //enableLocale: true,
            //locales :     { title : 'tab.photos' }
        },{
            xtype:      'placesmap',
            title:      'map',
            iconCls:    'browser',
            enableLocale: true,
            locales :     { title : 'tab.map' }
        },
        {
            xtype:      'settings',
            title:      'settings',
            iconCls:    'settings',
            enableLocale: true,
            locales :     { title : 'tab.settings' }
        }],
        
        listeners: {
            initialize: function(me) {
                console.log('init', me.getTabBar());
                
            
            
            
            }
        }
    },
    
});
