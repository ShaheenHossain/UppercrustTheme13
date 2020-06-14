odoo.define('sync_uppercrust_theme.editor.snippets.options', function (require) {
'use strict';
	
	var core = require('web.core');
	var Dialog = require('web.Dialog');
	var weWidgets = require('wysiwyg.widgets');
	var options = require('web_editor.snippets.options');

	var _t = core._t;
	var qweb = core.qweb;
	options.registry.custom_gallery = options.Class.extend({
		xmlDependencies: ['/sync_uppercrust_theme/static/src/xml/gallery_template.xml'],
		start: function () {
		    var self = this;
		    this.$target.on('click', '.o_add_images', function (e) {
		        e.stopImmediatePropagation();
		        self.addImages(false);
		    });
		    return this._super.apply(this, arguments);
		},
		addImages: function(previewMode) {
			var self = this;
			var $image = $(qweb.render('web_editor.gallery.image'));
			this._replaceContent($image);
		},
		/**
		 * @private
		 * @param {jQuery} $content
		 * @returns {jQuery} the main container of the snippet
		 */
		_replaceContent: function ($content) {
		    var $container = this.$('.image_box');
		    $container.append($content);
		    return $container;
		},
	});
});


odoo.define('sync_uppercrust_theme.custom_gallery', function (require) {
'use strict';
	var publicWidget = require('web.public.widget');

	publicWidget.registry.GalaryPhoto = publicWidget.Widget.extend({
	    selector: '.o_gallery_custom',
	    jsLibs: [
	    	'/sync_uppercrust_theme/static/lib/photoswipe/photoswipe.min.js',
	    	'/sync_uppercrust_theme/static/lib/photoswipe/photoswipe-ui-default.min.js',
        ],
        cssLibs: [
            '/sync_uppercrust_theme/static/lib/photoswipe/photoswipe.css',
            '/sync_uppercrust_theme/static/lib/photoswipe/default-skin.css',
        ],
	    events: {
	        'click .gallery_zoom': '_photoswipe',
	    },
	    start: function () {
	    	return this._super.apply(this, arguments);
	    },
	    /**
	     * @private
	     */
	    _photoswipe:function(ev) {
	        var $itemdata = []
	        var $image = this.$el.find('.image_box').children();
	        // var $index_current = 1;
	        var $index_current = $(ev.target).parents('.oe_snippet_body').index();
	        console.log($index_current);
	        _.each($image, function (elem) {
	            var $image_src = $(elem).find('.product_detail_img').attr('src')
	            $itemdata.push({'src': $image_src,'w': 0,'h': 0,})
	        });
	        this._updatePhotoswipe($itemdata,$index_current)
	    },
	    /**
	     * @private
	     */
	    _updatePhotoswipe: function($itemdata,$index_current) {
	        var pswpElement = document.querySelectorAll('.pswp')[0];
	        var items = $itemdata;
	        var options = {
	            index: $index_current,
	        };
	        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
	        gallery.listen('gettingData', function(index, item) {
	            if (item.w < 1 || item.h < 1) { // unknown size
	                var img = new Image();
	                img.onload = function() { // will get size after load
	                item.w = this.width; // set image width
	                item.h = this.height; // set image height
	                   gallery.invalidateCurrItems(); // reinit Items
	                   gallery.updateSize(true); // reinit Items
	                }
	            img.src = item.src; // let's download image
	            }
	        });
	        gallery.init();
	    },
	});
});