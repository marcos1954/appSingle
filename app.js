/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Ux': 'Ux'
});
//</debug>
Ext.Loader.setConfig({
    enabled: true,
    disableCaching : false
});



if (Ext.os.version.gtEq('7')) {
    // iPad or Homescreen or UIWebView
    if (Ext.os.deviceType === 'Tablet' || !Ext.browser.is.Safari || window.navigator.standalone) {
        Ext.define('Ext.iOS7Fix1.Viewport', {
            override : 'Ext.viewport.Ios',
            constructor : function () {
                var stretchHeights = {},
                        stretchWidths = {},
                        orientation = this.determineOrientation(),
                        screenHeight = window.screen.height,
                        screenWidth = window.screen.width,
                        menuHeight = orientation === this.PORTRAIT
                                ? screenHeight - window.innerHeight
                                : screenWidth - window.innerHeight;

                stretchHeights[this.PORTRAIT] = screenHeight - menuHeight;
                stretchHeights[this.LANDSCAPE] = screenWidth - menuHeight;
                stretchWidths[this.PORTRAIT] = screenWidth;
                stretchWidths[this.LANDSCAPE] = screenHeight;

                this.stretchHeights = stretchHeights;
                this.stretchWidths = stretchWidths;

                this.callOverridden(arguments);

                this.on('ready', this.setViewportSizeToAbsolute, this);
                this.on('orientationchange', this.setViewportSizeToAbsolute, this);
            },
            getWindowHeight : function () {
                return this.stretchHeights[this.orientation];
            },
            getWindowWidth : function () {
                return this.stretchWidths[this.orientation];
            },
            setViewportSizeToAbsolute : function () {
                this.setWidth(this.getWindowWidth());
                this.setHeight(this.getWindowHeight());
            }
        });
    }

    // iPad Only
    if (Ext.os.deviceType === 'Tablet') {
        Ext.define('Ext.iOS7Fix2.Viewport', {
            override : 'Ext.viewport.Ios',
            constructor : function () {

                this.callOverridden(arguments);

                window.addEventListener('scroll', function () {
                    if (window.scrollX !== 0) {
                        window.scrollTo(0, window.scrollY);
                    }
                }, false);
            },
            setViewportSizeToAbsolute : function () {
                window.scrollTo(0, 0);
                this.callOverridden(arguments);
            }
        });
    }
}

Ext.application({
    name: 'pvBiz',

requires: [
        'Ux.locale.Manager',
        'Ux.locale.override.st.Component',
        'Ux.locale.override.st.Button',
        'Ux.locale.override.st.Container',
        'Ux.locale.override.st.TitleBar',
        'Ux.locale.override.st.field.Field',
        'Ux.locale.override.st.form.FieldSet',
        'Ux.locale.override.st.picker.Picker',
        'pvBiz.controller.override.Map',

        'Ext.MessageBox'
    ],

    
    
    models: [ 'BaseModel', 'Business', 'Cats', 'Event' ],

    stores: [ 'Main' ],

    views: [
        'Main',
        'PlacesInfo',
        'PlacesEvents',
        'PlacesMap',
        'ImageViewer',
        'ImageCarousel',
        'Settings',
        'Photos'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,
    statusBarStyle: 'black',

    startupImage: {
        '320x460': 'resources/startup/320x460.png',
        '640x920': 'resources/startup/640x920.png',
        '640x1096': 'resources/startup/640x1096.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();        
        pvBiz = pvBiz || {};

        
        var mgr = Ux.locale.Manager;
        
        pvBiz.readCookie = function  (name) {
            var i,nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
        
        pvBiz.createCookie = function(name,value,days,minutes) {
            if (days || minutes) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000)+(minutes?(minutes*60*1000):0));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }

        pvBiz = pvBiz || {};
        pvBiz.lang = pvBiz.readCookie('lang') || navigator.language.split('-')[0] || 'en';
        pvBiz.createCookie('lang', pvBiz.lang, 0, 10);
        
        mgr.setConfig({
            ajaxConfig : {
                method : 'GET'
            },
            language   : pvBiz.lang,
            tpl        : './locale/{locale}.json',
            type       : 'ajax'
        });

        mgr.init(function(me, option, success, response){
            if (!success) {
                ggv_log('locale load failed: response is ', response);
                alert('locale info load failed');
            }
        });
        
        try { pvBiz.ggvId = ggvId; } catch(error) {pvBiz.ggvId = 0};
        pvBiz.hostname = location.hostname.split('.');
        
        var store = Ext.getStore('mainstore');
        var storeConfig = {
            lang: pvBiz.lang,
            id:   pvBiz.ggvId || 0
        };        
        
        if (!pvBiz.ggvId && (pvBiz.hostname[1] == 'guidevallarta')) {
            pvBiz.name = pvBiz.hostname[0];
            
            storeConfig = {
                lang: pvBiz.lang,
                name: pvBiz.hostname[0]
            };
        }
        
        store.getProxy().setExtraParams(storeConfig);
        store.load();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('pvBiz.view.Main'));
        Ext.Viewport.setMasked({ xtype: 'loadmask', indicator: true});
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
