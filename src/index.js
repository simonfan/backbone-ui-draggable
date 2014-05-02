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
		modelView = require('bb-model-view'),
		_ = require('lodash'),
		$ = require('jquery');

	var helpers = require('./__backbone-ui-draggable/helpers');

	var draggable = module.exports = modelView.extend({
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.call(this, options);

			this.initializeModelView(options);

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

			// enable disable
			this.initializeUIDraggableEnableDisable();

			// set initial data
			var pos = this.$el.position();
			var data = $.extend({
				draggableStatus: 'enabled',
				top: +pos.top,
				left: +pos.left

			}, options);

			this.modeld.set(data);
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
	draggable
		.proto(require('./__backbone-ui-draggable/delta-calc'))
		.proto(require('./__backbone-ui-draggable/movement'))
		.proto(require('./__backbone-ui-draggable/animation'))
		.proto(require('./__backbone-ui-draggable/event-handlers'))
		.proto(require('./__backbone-ui-draggable/enable-disable'))
});
