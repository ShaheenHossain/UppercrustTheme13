odoo.define('sync_uppercrust_theme.animation_root', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    var websiteRootData = require('website.root');
    var websiteNavbarRegistry = new publicWidget.RootWidgetRegistry();
	var animationRoot = publicWidget.RootWidget.extend({
		/**
		 * @override
		 */
		start: function () {
		    return this._super.apply(this, arguments).then(function () {
		    	$('.post').addClass("hidebefore").viewportChecker();
		    	$('.post-start').viewportChecker();
		    });
		},
		/**
		 * As the WebsiteNavbar instance is designed to be unique, the associated
		 * registry has been instantiated outside of the class and is simply
		 * returned here.
		 *
		 * @override
		 */
		_getRegistry: function () {
		    return websiteNavbarRegistry;
		},
	});
	websiteRootData.websiteRootRegistry.add(animationRoot, '.oe_structure')
	return {
	    animationRoot: animationRoot,
	    websiteNavbarRegistry: websiteNavbarRegistry,
	};
});