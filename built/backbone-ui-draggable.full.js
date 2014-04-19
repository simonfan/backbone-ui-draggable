define('__backbone-ui-draggable/helpers',['require','exports','module'],function (require, exports, module) {
	

	exports.min = function min(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {

			return v1 < v2 ? v1 : v2;
		}
	};

	exports.max = function max(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {
			return v1 > v2 ? v1 : v2;
		}

	};

	exports.fitValueWithin = function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
	};


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var isNumber = /^[0-9\-]+$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
	};

});

define('__backbone-ui-draggable/value-position',['require','exports','module','./helpers'],function (require, exports, module) {
	

	var helpers = require('./helpers');

	/**
	 * Runs the initialization logic that is needed for the value-position
	 * system.
	 *
	 * @method initializeDraggableValuePosition
	 * @param options {Object}
	 */
	exports.initializeDraggableValuePosition = function initializeDraggableValuePosition(options) {


		// listen to changes on value attribute
		var model = this.model,
			valueAttribute = this.valueAttribute;

		this.listenTo(model, 'change:' + valueAttribute, function (model, value) {

			var pos = this.toPosition(model.get(valueAttribute));

			model.set({
				top: parseInt(pos.top, 10),
				left: parseInt(pos.left, 10)
			});

		}, this);

		// initialize value/position
		if (model.get(valueAttribute)) {
			var pos = this.toPosition(model.get(valueAttribute));

			model.set({
				top: parseInt(pos.top, 10),
				left: parseInt(pos.left, 10)
			});
		} else {
			model.set(valueAttribute, this.toValue(model));
		}

	};

	/**
	 * The name of the attribute to be set as 'value'
	 *
	 * @property valueAttribute
	 * @type String
	 */
	exports.valueAttribute = 'value';

	/**
	 * Sets the 'valueAttribute' attribute on the model.
	 *
	 * @method setValue
	 * @param value *
	 */
	exports.setValue = function setValue(value) {
		this.model.set(this.valueAttribute, value);
		return this;
	};

	/**
	 * Takes the backbone model of the draggalbe item
	 * and is expected to return a 'value'.
	 *
	 * @method toValue
	 * @param model {BB Model}
	 */
	exports.toValue = function toValue(model) {
		return 'At ' + model.get('top') + ' x ' + model.get('left');
	};

	/**
	 * Takes a value and is expected to return a position
	 * object containg { top: Number, left: Number }
	 *
	 * @method toPosition
	 * @param value
	 */
	exports.toPosition = function toPosition(value) {
		var values = value.split('x');

		return {
			top: values[0].replace(/[^0-9\-]/g, ''),
			left: values[1].replace(/[^0-9\-]/g, ''),
		};
	};
});

define('__backbone-ui-draggable/movement',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

	var _ = require('lodash');

	var h = require('./helpers');

	exports.moveX = function moveX(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('x') === -1) {
				return attemptedDelta;
			}

			var model = this.model,
				previousLeft = parseInt(model.get('left'), 10),

				// convert the attemptedDelta into attemptedLeft
				attemptedLeft = previousLeft + attemptedDelta;

			var width = parseInt(this.$el.width(), 10);

			// minimums
			var minLeft = parseInt(model.get('minLeft'), 10),
				minRight = parseInt(model.get('minRight'), 10),
				min = h.max(minLeft, minRight - width);

			// maximums
			var maxLeft = parseInt(model.get('maxLeft'), 10),
				maxRight = parseInt(model.get('maxRight'), 10),
				max = h.min(maxLeft, maxRight - width);

				// get the allowed left
			var left = h.fitValueWithin(attemptedLeft, min, max);

			model.set('left', parseInt(left), 10);
			model.set(this.valueAttribute, this.toValue(model));


			var delta = model.get('left') - previousLeft;

			// events
			if (!options.silent && delta !== 0) {
				var eventData = _.assign({
					axis: 'x',
					delta: delta,

					direction: delta > 0 ? 'right' : 'left'

				}, options);

				this.trigger('move', this, eventData)
					.trigger('move-x', this, eventData);
			}

			// return remainder
			return attemptedDelta - delta;

		} else {

			return 0;
		}
	};

	exports.moveY = function moveY(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('y') === -1) {
				return attemptedDelta;
			}

			var model = this.model,
				previousTop = parseInt(model.get('top'), 10),

				// convert the attemptedDelta into attemptedTop
				attemptedTop = previousTop + attemptedDelta;

			var height = parseInt(this.$el.height(), 10);

			// minimums
			var minTop = parseInt(model.get('minTop'), 10),
				minBottom = parseInt(model.get('minBottom'), 10),
				min = h.max(minTop, minBottom - height);

			// maximums
			var maxTop = parseInt(model.get('maxTop'), 10),
				maxBottom = parseInt(model.get('maxBottom'), 10),
				max = h.min(maxTop, maxBottom - height);

				// get the allowed top
			var top = h.fitValueWithin(attemptedTop, min, max);

			model.set('top', parseInt(top));
			model.set(this.valueAttribute, this.toValue(model));

			var delta = model.get('top') - previousTop;

			// events
			if (!options.silent && delta !== 0) {
				var eventData = _.assign({

					axis: 'y',
					delta: delta,
					direction: delta > 0 ? 'bottom' : 'top',

				}, options);

				this.trigger('move', this, eventData)
					.trigger('move-y', this, eventData);
			}

			// return remainder
			return attemptedDelta - delta;
		} else {
			return 0;
		}
	};

	exports.moveToLeft = function moveToLeft(attemptedDelta, silent) {
		return -1 * this.moveX(-1 * attemptedDelta, silent);
	};

	exports.moveToRight = function moveToRight(attemptedDelta, silent) {
		return this.moveX(attemptedDelta, silent);
	};

	exports.moveToTop = function moveToTop(attemptedDelta, silent) {
		return -1 * this.moveY(-1 * attemptedDelta, silent);
	};

	exports.moveToBottom = function moveToBottom(attemptedDelta, silent) {
		return this.moveY(attemptedDelta, silent);
	};
});

/**
 *
 * @module backbone-ui-draggable
 * @submodule event-handlers
 */

define('__backbone-ui-draggable/event-handlers',['require','exports','module'],function (require, exports, module) {
	


	exports.mousedown = function mousedown(e) {

		if (this.$el.is(e.target) && e.which === 1 && !this.model.get('disabled')) {

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
	};

	exports.mousemove = function mousemove(e) {

		var last = this.lastPosition,
			x = e.pageX,
			y = e.pageY,
			dx = x - last.x,
			dy = y - last.y;


		var offset = this.$el.offset(),
			handleX = this.handlePosition.x + offset.left,
			handleY = this.handlePosition.y + offset.top;


		if ((dx > 0 && x > handleX ) || (dx < 0 && x < handleX)) {
			this.moveX(dx, {
				agent: 'mousemove'
			});
		}

		if ((dy > 0 && y > handleY) || (dy < 0 && y < handleY)) {
			this.moveY(dy, {
				agent: 'mousemove'
			});
		}

		last.x = x;
		last.y = y;

		// preventDefault AND stopPropagation
		return false;
	};

	exports.mouseup = function mouseup() {
		this.$window.off('mousemove', this.mousemove);

		delete this.lastPosition;

		this.model.set('status', 'stopped');


		this.trigger('movestop', this);
	};
});

//     BackboneUiDraggable
//     (c) simonfan
//     BackboneUiDraggable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module BackboneUiDraggable
 */

define('backbone-ui-draggable',['require','exports','module','lowercase-backbone','model-dock','lodash','jquery','./__backbone-ui-draggable/helpers','./__backbone-ui-draggable/value-position','./__backbone-ui-draggable/movement','./__backbone-ui-draggable/event-handlers'],function (require, exports, module) {
	

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
				top: parseInt(pos.top, 10),
				left: parseInt(pos.left, 10)

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

		/**
		 * Set the disabled option to true.
		 *
		 * @method disable
		 */
		disable: function disable() {
			this.model.set('disabled', true);
		},

		/**
		 * Set the disabled option to false.
		 *
		 * @method enable
		 */
		enable: function enable() {
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

