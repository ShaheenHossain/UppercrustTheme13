odoo.define('sync.uppercrust.s_video_editor', function (require) {
'use strict';

require('web.dom_ready');
var WysiwygMultizone = require('web_editor.wysiwyg.multizone');

    WysiwygMultizone.include({
        /**
         * @override
         */
        start: function () {
            var self = this;
            if ($('#web_editor-top-edit').length > 0) {
                $('.glass').remove();
            } 
            return this._super();
        },
    });
});
