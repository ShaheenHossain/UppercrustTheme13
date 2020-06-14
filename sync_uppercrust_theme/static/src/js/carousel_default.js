odoo.define('sync_uppercrust_theme.carousel_default', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.CarouselDefault = publicWidget.Widget.extend({
        selector: ".s_carousel_default",
        /**
         * @override
         */
        start: function () {
            var self = this;
            this.$el.on('slide.bs.carousel', function () {
                var animation = self.$el.find('.carousel-item.active').next();
                animation.find('.carousel-img').removeClass("hidebefore").addClass("visible animated bounceInLeft");
                animation.find('.carousel_text').removeClass("hidebefore").addClass("visible animated bounceInDown");
            });
            return this._super();
        },
    });
});