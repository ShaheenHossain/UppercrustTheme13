odoo.define('sync_uppercrust_theme.counter_snippet', function (require) {
    'use strict';

    var ajax = require('web.ajax');
    var core = require('web.core');
    var Dialog = require('web.Dialog');
    var options = require('web_editor.snippets.options');

    var _t = core._t;
    var qweb = core.qweb;

    ajax.loadXML('/sync_uppercrust_theme/static/src/xml/templates.xml', qweb);

    var CounterDialog = Dialog.extend({
        template: 'uppercrust_theme.dialog.counter',
        dialog_title: _t('Customize Counter'),
        /**
         * @override
         */
        init: function (parent, title, counter) {
            this.counter = counter;
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
            this.$el.find('.oe_cu_counter_model').show();
            this.$el.find('.oe_cu_counter_model').addClass('in');
            var res = self._getData($(this.counter));
            this.$el.find('input#stop-counter')[0].value = res['stop_counter'];
            return this._super();
        },
        /**
         * @private
         */
        _doSave: function () {
            var self = this;
            $(this.counter).attr({'stop-counter': this.$el.find('input#stop-counter')[0].value});
            this.$el.find('.oe_cu_counter_model').removeClass('in');
            this.$el.find('.oe_cu_counter_model').hide();
            this.destroy();
        },
        /**
         * @private
         */
        _doCancel: function () {
            this.$el.find('.oe_cu_counter_model').removeClass('in');
            this.$el.find('.oe_cu_counter_model').hide();
            this.destroy();
        },
        /**
         * @private
         */
        _getData: function (counter) {
            var result = {};
            result['stop_counter'] = counter.attr('stop-counter');
            return result;
        }
    });

    options.registry.s_counter = options.Class.extend({
        /**
         * @override
         */
        start: function () {
            var self = this;
            this.$target.attr("contentEditble", true);
            return this._super();
        },
        /**
         * @private
         */
        _onCustomizeButtonClicked: function (counter_el) {
            var self = this;
            var title = _.str.sprintf(_t('Customize Counter'));
            new CounterDialog(self, title, counter_el).open();
        },
        /**
         * @private
         */
        customize: function (type) {
            var self = this;
            if (!type) self._onCustomizeButtonClicked(self.$target);
        }
    });
});

odoo.define('sync_uppercrust_theme.counter_snippet_public', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.Scounter = publicWidget.Widget.extend({
        selector: ".s_counter",
        /**
         * @override
         */
        start: function () {
            $('.post-start').viewportChecker({
                callbackFunction: function (elem, action) {
                    var elements = document.getElementsByClassName('odometer');
                    _.each(elements, function odoelement(element) {
                        setTimeout(function() {
                            var odometer_elem = new Odometer({
                                el: element
                            });
                            odometer_elem.update(element.getAttribute('stop-counter'));
                        }, 1000);
                    })
                }
            });
            return this._super();
        },
    });
});