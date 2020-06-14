odoo.define('sync.uppercrust.theme', function (require) {
    'use strict';
    var ajax = require('web.ajax');
    var core = require('web.core');
    var Dialog = require('web.Dialog');
    var options = require('web_editor.snippets.options');
    var widget = require('web_editor.widget');
    var editor = require('web_editor.editor');

    var _t = core._t;
    var qweb = core.qweb;

    ajax.loadXML('/sync_uppercrust_theme/static/src/xml/templates.xml', qweb);

    var ProgressbarDialog = Dialog.extend({
        template: 'uppercrust_theme.dialog.progressbar',
        dialog_title: _t('Customize Progress'),
        /**
         * @override
         */
        init: function (parent, title, pbar) {
            this.pbar = pbar;
            this._super(parent, {
                title: title,
                size: "medium",
                buttons: [{
                    text: _t("Save"),
                    close: true,
                    classes: "btn-primary",
                    click: this._doSave.bind(this),
                }, {
                    text: _t("Cancel"),
                    close: true,
                    classes: "btn-primary",
                    click: this._doCancel.bind(this),
                }],
            });
        },
        /**
         * @override
         */
        start: function () {
            var self = this;
            var res = self._getData($(this.pbar).find('div.progress-bar'));
            this.$el.find('input#pbar-color')[0].value = res['bg_color'];
            this.$el.find('input#pbar-perc')[0].value = res['perc_val'];
            this.$el.find('input#pbar-time')[0].value = res['pbar-time'];
            return this._super();
        },
        /**
         * @private
         */
        _doSave: function () {
            var self = this;
            var colorval = this.$el.find('input#pbar-color')[0].value;
            var percval = this.$el.find('input#pbar-perc')[0].value;
            var timeval = this.$el.find('input#pbar-time')[0].value;
            var pbar_el = $(this.pbar).find('div.progress-bar');
            pbar_el.removeClass(function (index, css) {
                return (css.match(/\bbar-\S+/g) || []).join(' ')
            });
            pbar_el.attr({
                'data-pro-bar-percent': percval,
                'data-pro-bar-delay': timeval,
                'title': percval + "%"
            }).css({'background-color': colorval, 'width': percval + "%"}).addClass('bar-' + percval);
            this.destroy();
        },
        /**
         * @private
         */
        _doCancel: function () {
            this.destroy();
        },
        /**
         * @private
         */
        _getData: function (pbar) {
            var result = {};
            result['perc_val'] = pbar.attr('data-pro-bar-percent');
            result['bg_color'] = pbar.css('background-color');
            result['pbar-time'] = pbar.attr('data-pro-bar-delay');
            return result;
        }
    });

    options.registry.s_progressbar = options.Class.extend({
        /**
         * @override
         */
        start: function () {
            this.$target.attr("contentEditable", false);
            return this._super();
        },
        /**
         * @private
         */
        _onCustomizeButtonClicked: function (pbar_el) {
            var self = this;
            var title = _.str.sprintf(_t('Customize Progress'));
            new ProgressbarDialog(self, title, pbar_el).open();
        },
        /**
         * @private
         */
        customize: function (type) {
            var self = this;
            if (!type) self._onCustomizeButtonClicked(self.$target);
        }
    });
    editor.Class.include({
        /**
         * @override
         */
        save: function () {
            $('.post').each(function(ev){
                $(this).removeClass($(this).data('vp-add-class'));
            });
            return this._super();
        },
    });
});