Ext.define('pvBiz.view.Photos', {
    extend:   'pvBiz.view.ImageCarousel',
    
    requires: ['pvBiz.view.ImageViewer'],
    
    xtype:    'photos',
    
    config: {
        indicator:  true,
        layout:     'card',
        style: 'background-color: black;',
    },
    
    setData: function(data, type) {
        var     x = type || 'photos';
        var     prefix = ((x == 'photos') ?'data.list_pix' :'data.list_menu_pix');
        var     maxPix = (x == 'photos') ? 10 : 9;
        var     items = [];
        
        this.removeAll();
        for (var i = 1; i < maxPix; i++) {
            var j = eval(prefix + i);
            if (j) {
                items.push({
                    layout:         'fit',
                    xtype:          'imageviewer',
                    style:          { backgroundColor: '#333' },
                    errorImage:     'resources/images/NoImage.png',
                    imageSrc:       'http://www.gayguidevallarta.com/img.io/timthumb.php?' +
                                    ((x == 'photos') ?'h=600' :'h=1024') +
                                    '&src=' + j.replace('http://www.gayguidevallarta.com','')
                });
            }
        }
        this.setItems(items);
        this.setActiveItem(0);
    }
});