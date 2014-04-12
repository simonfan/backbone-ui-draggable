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
	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var number = /^[0-9\-]+$/;
	function stringifyPositionalValue(v) {
		// [1] check if it is a number
		return number.test(v) ? v + 'px' : v;
	}



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
			this.$canvas = options.canvas || this.canvas || this.$window;

			var data = $.extend({
				status: 'stopped',

				minX: 0,
				maxX: this.$canvas.width() - this.$el.width(),

				minY: 0,
				maxY: this.$canvas.height() - this.$el.height()

			}, this.$el.position(), options);

			// set initial position

			var model = this.model;

			model.set(data);

			// listen to changes on value attribute
			var valueAttribute = this.valueAttribute;
			this.listenTo(model, 'change:' + valueAttribute, function (model, value) {

				model.set(this.toPosition(value));

			}, this);

			// initialize value/position
			if (model.get(valueAttribute)) {
				model.set(this.toPosition(model.get(valueAttribute)));
			} else {
				model.set(valueAttribute, this.toValue(model));
			}

		},

		events: {
			mousedown: 'mousedown',
		},

		mousedown: function mousedown(e) {

			if (this.$el.is(e.target) && e.which === 1) {

				this.model.set('status', 'dragging');

				this.lastPosition = {
					x: e.pageX,
					y: e.pageY
				};


				var offset = this.$el.offset();

				this.handlePosition = {
					x: e.pageX - offset.left,
					y: e.pageY - offset.top
				};

				this.$window
					.on('mousemove', this.mousemove)
					.on('mouseup', this.mouseup);

				this.trigger('movestart', this);

				// preventDefault AND stopPropagation
				// http://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
				return false;

			}
		},

		mousemove: function mousemove(e) {

			var last = this.lastPosition,
				x = e.pageX,
				y = e.pageY,
				dx = x - last.x,
				dy = y - last.y;


			var offset = this.$el.offset(),
				handleX = this.handlePosition.x + offset.left,
				handleY = this.handlePosition.y + offset.top;


			if ((dx > 0 && x > handleX ) || (dx < 0 && x < handleX)) {
				this.moveX(dx);
			}

			if ((dy > 0 && y > handleY) || (dy < 0 && y < handleY)) {
				this.moveY(dy);
			}

			last.x = x;
			last.y = y;

			// preventDefault AND stopPropagation
			return false;
		},

		mouseup: function mouseup() {
			this.$window.off('mousemove', this.mousemove);

			delete this.lastPosition;

			this.model.set('status', 'stopped');


			this.trigger('movestop', this);

			// preventDefault AND stopPropagation
			//return false;
		},

		axis: 'xy',

		valueAttribute: 'value',

		setValue: function setValue(value) {
			this.model.set(this.valueAttribute, value);
			return this;
		},

		toValue: function toValue(model) {
			return 'At ' + model.get('top') + ' x ' + model.get('left');
		},

		toPosition: function toPosition(value) {
			var values = value.split('x');

			return {
				top: values[0].replace(/[^0-9\-]/g, ''),
				left: values[1].replace(/[^0-9\-]/g, ''),
			};
		},

		map: {
			left: '->css:left',
			top: '->css:top',
		},

		stringifiers: {
			left: stringifyPositionalValue,
			top: stringifyPositionalValue
		}
	});

	// extend
	draggable.proto(require('./__backbone-ui-draggable/move'));
});
