//     BackboneUiDraggable
//     (c) simonfan
//     BackboneUiDraggable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module BackboneUiDraggable
 */

define(function (require, exports, module) {
	'use strict';

	var backbone = require('lowercase-backbone'),
		modelDock = require('model-dock'),
		_ = require('lodash'),
		$ = require('jquery');

	var helpers = require('./__backbone-ui-draggable/helpers');

	var draggable = module.exports = modelDock.extend({
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.call(this, options);

			this.initializeModelDock(options);

			this.initializeUIDraggable(options);
		},

		initializeUIDraggable: function initializeUIDraggable(options) {

			// bind methods
			_.bindAll(this, 'mousedown', 'mousemove', 'mouseup');

			// add class
			this.$el.addClass(this.draggableClass);

			// window
			this.$window = $(window);

			// canvas
			this.$canvas = options.canvas || this.canvas || this.$el.parent();

			var pos = this.$el.position();

			var data = $.extend({
				draggableStatus: 'enabled',
				disabled: false,
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)

			}, options);

			// set initial data
			var model = this.model;
			model.set(data);

			// listen to enable and disable option changes
			this.listenTo(model, 'change:draggableStatus', function (model) {

				if (this.draggableEnabled()) {
					// is enabled
					this.$el
						.removeClass(this.draggableClass + '-disabled')
						.addClass(this.draggableClass + '-enabled');
				} else {
					// is disabled
					this.$el
						.removeClass(this.draggableClass + '-enabled')
						.addClass(this.draggableClass + '-disabled');
				}

			});


			// initialize value-position system.
			this.initializeDraggableValuePosition(options);
		},

		/**
		 * The class to be added to the draggable html eleemnt.
		 *
		 * @property draggableClass
		 * @type String
		 */
		draggableClass: 'draggable',

		events: {
			mousedown: 'mousedown',
		},


		when: require('./__backbone-ui-draggable/when'),

		/**
		 * Set the disabled option to true.
		 *
		 * @method disableDraggable
		 */
		disableDraggable: function disableDraggable() {
			this.model.set('draggableStatus', 'disabled');
		},

		/**
		 * Set the disabled option to false.
		 *
		 * @method enableDraggable
		 */
		enableDraggable: function enableDraggable() {
			this.model.set('draggableStatus', 'enabled');
		},

		draggableEnabled: function draggableEnabled() {
			return this.model.get('draggableStatus') === 'enabled';
		},

		axis: 'xy',

		map: {
			left: '->css:left',
			top: '->css:top',
		},

		stringifiers: {
			left: helpers.stringifyPositionalValue,
			top: helpers.stringifyPositionalValue,
		}
	});

	// extend
	draggable.proto(require('./__backbone-ui-draggable/value-position'));
	draggable.proto(require('./__backbone-ui-draggable/delta-calc'));
	draggable.proto(require('./__backbone-ui-draggable/movement'));
	draggable.proto(require('./__backbone-ui-draggable/animation'));
	draggable.proto(require('./__backbone-ui-draggable/event-handlers'));
});
