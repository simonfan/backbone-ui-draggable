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

			// window
			this.$window = $(window);

			// canvas
			this.$canvas = options.canvas || this.canvas || this.$el.parent();

			var pos = this.$el.position();

			var data = $.extend({
				status: 'stopped',
				disabled: false,
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)

			}, options);

			// set initial data
			var model = this.model;
			model.set(data);

			// listen to enable and disable option changes
			this.listenTo(model, 'change:disabled', function (model) {

				if (model.get('disabled')) {
					// is disabled
					this.$el
						.removeClass('enabled')
						.addClass('disabled');
				} else {
					// is enabled
					this.$el
						.removeClass('disabled')
						.addClass('enabled');
				}

			});


			// initialize value-position system.
			this.initializeDraggableValuePosition(options);
		},

		events: {
			mousedown: 'mousedown',
		},


		when: require('./__backbone-ui-draggable/when'),

		animate: require('./__backbone-ui-draggable/animate'),

		/**
		 * Set the disabled option to true.
		 *
		 * @method disableDraggable
		 */
		disableDraggable: function disableDraggable() {
			this.model.set('disabled', true);
		},

		/**
		 * Set the disabled option to false.
		 *
		 * @method enableDraggable
		 */
		enableDraggable: function enableDraggable() {
			this.model.set('disabled', false);
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
	draggable.proto(require('./__backbone-ui-draggable/movement'));
	draggable.proto(require('./__backbone-ui-draggable/event-handlers'));
});
