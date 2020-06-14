odoo.define('sync_uppercrust_theme.progressbar_snippet', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.Sprogressbar = publicWidget.Widget.extend({
        selector: ".s_progressbar",
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
            return this._super().then(function () {
                _.each($('.progress-bar'), function (pbar) {
                $(pbar).removeClass(function (index, css) {
                    return (css.match(/(animated{0,8})/g) || []).join(' ')
                })
                });
                _.each($('.post.hidebefore'), function (animate_post) {
                    $(animate_post).removeClass('hidebefore')
                });
            });

        },
    });
});