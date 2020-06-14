odoo.define('sync.uppercrust.video_snippet', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.video = publicWidget.Widget.extend({
        selector: ".st-video",
        events: {
            'click .video_link': '_PopUpModel',
        },
        jsLibs: [
           '/sync_uppercrust_theme/static/lib/progressbar/js/appear.min.js',
           '/sync_uppercrust_theme/static/lib/progressbar/js/pro-bars.min.js',
           '/sync_uppercrust_theme/static/lib/progressbar/js/smoothscroll.min.js',
        ],
        cssLibs: ['/sync_uppercrust_theme/static/lib/progressbar/css/normalize.css',
            '/sync_uppercrust_theme/static/lib/progressbar/css/pro-bars.min.css'],
        /**
         * @override
         */
        start: function () {
            var self = this;
            var anchor_el = this.$el.find('.video_link a')
            var YouTubeUrl = anchor_el.attr('href');
            this.popUpLink = this.$el.find('#inlineVideo').attr('src',YouTubeUrl);
            this.youtube_parser = self.youtube_parser(YouTubeUrl);
            // $('.glass').remove();
            return this._super();
        },
        /**
         * @private
         */
        check_str: function (str) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(str);
        },
        /**
         * @private
         */
        youtube_parser: function (url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            return (match && match[7].length == 11) ? match[7] : false;
        },
        /**
        * @private
        */
        _PopUpModel: function() {
            var self = this;
            if(!$('body').hasClass('editor_enable')) {
                $('#inlineVideo').replaceWith('<embed id="inlineVideo" src="https://www.youtube.com/v/'+ self.youtube_parser +'" type="application/x-shockwave-flash" width="680" height="490" wmode="transparent" allowfullscreen="true" allowscriptaccess="always"/>');
                $('#video_modal').modal("show");
            }
            $('#video_modal').on('hidden.bs.modal', function () {
                $('#inlineVideo').replaceWith('<div id="inlineVideo"/>');
            });
        },
    });
});