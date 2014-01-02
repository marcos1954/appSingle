/**
 *
 */
Ext.define('pvBiz.view.Settings', {
    extend: 'Ext.form.FormPanel',
    requires: [
        'Ext.field.Radio',
        'Ext.field.Slider',
        'Ext.form.FieldSet'
    ],
    xtype:  'settings',
    alias:  'widget.settings',

    config: {
        id:         'settingsCard',
        scrollable: 'vertical',
        xtype:      'form',

        items: [{
            id:           'textsize',
            xtype:        'fieldset',
            enableLocale: true,
            locales:      { title : 'settings.textsize.title' },
            style:        'font-size: 80%;',
            defaults: {
                width:       '100%',
                labelWidth:  '40%'
            },
            
            items: [{
                id:           'textsizeslider',
                xtype:        'sliderfield',
                enableLocale: true,
                locales:      { label : 'settings.textsize.fieldlabel' },
                increment:    1,
        
        
                listeners: {
                    initialize: function(me) {
                        pvBiz.changemysize = function(myvalue) {
                            var div = document.body;
                            div.style.fontSize = myvalue;   
                        };
                        pvBiz.getbodytxtsize = function() {
                            return window.getComputedStyle(document.body, null).fontSize;
                        };

                        pvBiz.txtSzBase = parseInt(pvBiz.getbodytxtsize().replace( /\D+/g, ''));
                        pvBiz.txtSz = pvBiz.readCookie('txtSz') || pvBiz.txtSzBase;
                        
                        var x = pvBiz.txtSzBase;
                        me.setMaxValue(x+2);
                        me.setMinValue(x-2);
                        me.setValue(pvBiz.txtSz || x);
                    },
                    change: function(me, sl, thumb, newValue, oldValue) {
                        pvBiz.changemysize(newValue+"px");
                        pvBiz.txtSz = newValue;
                        pvBiz.createCookie('txtSz', newValue, 0, 300);
                    },
                    painted: function() {
                        if (pvBiz.txtSz) this.setValue(parseInt(pvBiz.txtSz));
                    }
                }
            }]
        },{
            xtype:          'fieldset',
            id:             'langfieldset',
            enableLocale:   true,
            locales:        { title: 'settings.lang.title' },
            style:          'font-size: 80%;',

            defaults: {
                name:         'lang',
                width:        '100%',
                labelWidth:   '70%',
                minHeight:    '45px',
                xtype:        'radiofield',
                checked:      false,
                enableLocale: true,

                listeners: {
                    check: function (a) {
                        var     newlang, oldlang = pvBiz.lang;

                        if (a.id == 'englishCheck') newlang = 'en';
                        if (a.id == 'espanolCheck') newlang = 'es';
                        if (a.id == 'frenchCheck')  newlang = 'fr';

                        if (oldlang == newlang) return;

                        Ext.Msg.show({
                            title:  "Gay Guide Vallarta",
                            message: 'Change Language?',
                            width: 300,
                            buttons: [
                               {enableLocale: true, locales: { text: 'buttons.no' },  itemId: 'no'},
                               {enableLocale: true, locales: { text: 'buttons.yes' }, itemId: 'yes', ui: 'action'}
                            ],
                            fn: function(b, v, o) {
                                var     x = Ext.Viewport.query('#langfieldset')[0];

                                if (b == 'yes') {
                                    if (oldlang != newlang) {
                                        pvBiz.lang = newlang;
                                        pvBiz.createCookie('lang', pvBiz.lang, 0, 300);

                                        Ux.locale.Manager.updateLocale(pvBiz.lang, function() {
                                            var store = Ext.getStore('mainstore');
                                            
                                            store.removeAll();
                                            store.getProxy().setExtraParams({
                                                lang: pvBiz.lang,
                                                id:   ggvId
                                            });
                                            store.load();
                                        });
                                    }
                                    return;
                                }

                                if (pvBiz.lang == 'en') {
                                    x.getComponent(0).check();
                                }
                                else if (pvBiz.lang == 'es') {
                                    x.getComponent(1).check();
                                }
                                else if (pvBiz.lang == 'fr') {
                                    x.getComponent(2).check();
                                }
                            }
                        });
                    },
                }
            },

            items: [{
                id:       'englishCheck',
                locales:  { label : 'settings.lang.english' },
                checked:  (pvBiz.lang == 'en')
            },{
                id:       'espanolCheck',
                locales:  { label : 'settings.lang.spanish' },
                checked:  (pvBiz.lang == 'es')
            },{
                id:       'frenchCheck',
                locales:  { label : 'settings.lang.french' },
                checked:  (pvBiz.lang == 'fr')
            }]
        }],
        
        listeners: {
            activate: function(c,n,o) {
                var x = n.down('#langfieldset');

                if (pvBiz.lang == 'en') {
                    x.getComponent(0).check();
                }
                else if (pvBiz.lang == 'es') {
                    x.getComponent(1).check();
                }
                else if (pvBiz.lang == 'fr') {
                    x.getComponent(2).check();
                }
            }
        }
    }
});
