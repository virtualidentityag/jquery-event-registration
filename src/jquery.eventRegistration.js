/**
 * @name          jQuery Event Registration Plugin
 * @version       1.0
 * @lastmodified  2016-07-07
 * @package       html-css-js
 * @subpackage    jQuery plugin
 * @author        Jan Rembold, VI
 *
 * based on: http://jqueryboilerplate.com/
 */

;(function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'eventRegistration',
        defaults = {
            dependencies: null,
            listen: null,
            trigger: null
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        var self = this;
        self.$element = $(element);
        self.options = $.extend({}, defaults, options);
        self.init();
    }

    // methods
    var methods = {
        init: function() {
            var self = this;

            // internal variables
            self.firedEvents = 0;

            // check all required options
            self.checkOptions();

            // search for dependencies
            self.searchDependencies();

            // nothing to listen
            if(!self.$dependencies.length) {
                return;
            }

            console.log(self.$dependencies.length + ' dependencies found');

            // set listeners to dependencies
            self.addListener();

        },

        searchDependencies: function() {
            var self = this;

            if($.isFunction(self.options.dependencies)) {
                // TODO
            } else {
                self.$dependencies = self.$element.find(self.options.dependencies);
            }
        },

        addListener: function() {
            var self = this;

            self.$dependencies.on(self.options.listen, function() {
                self.firedEvents++;

                // trigger target event
                if(self.firedEvents >= self.$dependencies.length) {
                    self.firedEvents = 0;
                    self.fireTargetEvent();
                }
            });
        },

        fireTargetEvent: function() {
            var self = this;

            if($.isFunction(self.options.trigger)) {
                // TODO
            } else {
                self.$element.trigger(self.options.trigger);
            }
        },

        checkOptions: function() {
            var self = this;

            // check dependencies
            if(!self.options.dependencies) {
                throw 'Dependencies not set';
            }

            // check listener
            if(!self.options.listen) {
                throw 'Listener event not set';
            }

            // check trigger
            if(!self.options.trigger) {
                throw 'Trigger event not set';
            }
        }
    };

    $.extend(Plugin.prototype, methods);

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if(!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);
