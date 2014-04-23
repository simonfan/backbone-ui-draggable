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
	var isNumber = /^-?\d*(\.\d+)?$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
	};

});

define('__backbone-ui-draggable/when',['require','exports','module','object-query'],function (require, exports, module) {
	

	var objectQuery = require('object-query');

	/**
	 * Create complex listeners
	 *
	 * @method when
	 * @param criteria {Object}
	 *     The criteria to be passed to objectQuery
	 * @param callback {Function}
	 * @param [context] {Object}
	 */
	module.exports = function when(criteria, callback, context) {

		var query = objectQuery(criteria),
			model = this.model;

		model.on('change', function () {

			if (query(model.toJSON())) {
				// run callback with the draggable as first argument.
				callback.apply(context, [this]);
			}
		}, this);
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
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)
			});

		}, this);

		// initialize value/position
		if (model.get(valueAttribute)) {
			var pos = this.toPosition(model.get(valueAttribute));

			model.set({
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)
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

		var pos =  {
			top: parseFloat(values[0].replace(/[^0-9.\-]/g, '')),
			left: parseFloat(values[1].replace(/[^0-9.\-]/g, '')),
		};

		return pos;
	};
});

define('__backbone-ui-draggable/delta-calc',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

	var _ = require('lodash');

	var h = require('./helpers');

	exports.xAllowedDelta = function xAllowedDelta(attemptedDelta) {

		var model = this.model,
			previousLeft = parseFloat(model.get('left')),

			// convert the attemptedDelta into attemptedLeft
			attemptedLeft = previousLeft + attemptedDelta;

		var width = parseFloat(this.$el.width());

		// minimums
		var minLeft = parseFloat(model.get('minLeft')),
			minRight = parseFloat(model.get('minRight')),
			min = h.max(minLeft, minRight - width);

		// maximums
		var maxLeft = parseFloat(model.get('maxLeft')),
			maxRight = parseFloat(model.get('maxRight')),
			max = h.min(maxLeft, maxRight - width);

			// get the allowed left
		var left = h.fitValueWithin(attemptedLeft, min, max);

			// return the allowed delta
		return left - previousLeft;
	};

	exports.yAllowedDelta = function yAllowedDelta(attemptedDelta) {

		var model = this.model,
			previousTop = parseFloat(model.get('top')),

			// convert the attemptedDelta into attemptedTop
			attemptedTop = previousTop + attemptedDelta;

		var height = parseFloat(this.$el.height());

		// minimums
		var minTop = parseFloat(model.get('minTop')),
			minBottom = parseFloat(model.get('minBottom')),
			min = h.max(minTop, minBottom - height);

		// maximums
		var maxTop = parseFloat(model.get('maxTop')),
			maxBottom = parseFloat(model.get('maxBottom')),
			max = h.min(maxTop, maxBottom - height);

			// get the allowed top
		var top = h.fitValueWithin(attemptedTop, min, max);

		// return allowed delta
		return top - previousTop;
	};
});

define('__backbone-ui-draggable/movement',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

	var _ = require('lodash');

	var h = require('./helpers');

	exports.beforeMoveX = function beforeMoveX() {};

	exports.moveX = function moveX(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('x') === -1) {
				return attemptedDelta;
			}

			var model = this.model;


			// get true delta
			var delta = options.force ? attemptedDelta : this.xAllowedDelta(attemptedDelta);

			// hooks
			var hookRes = this.beforeMoveX(delta, options);
			delta = _.isNumber(hookRes) ? hookRes : delta

			// set left
			model.set('left', parseFloat(model.get('left')) + delta);

			// set value attribute
			model.set(this.valueAttribute, this.toValue(model));

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

	exports.beforeMoveY = function beforeMoveY() {};

	exports.moveY = function moveY(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('y') === -1) {
				return attemptedDelta;
			}

			var model = this.model;

			// get allowed delta
			var delta = this.yAllowedDelta(attemptedDelta);


			var hookRes = this.beforeMoveY(delta, options);
			delta = _.isNumber(hookRes) ? hookRes : delta;

			// set new top
			model.set('top', parseFloat(model.get('top')) + delta);

			// update value
			model.set(this.valueAttribute, this.toValue(model));

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

define('__backbone-ui-draggable/animation',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	/**
	 * The same as moveX, but with animation.
	 *
	 * @method animateX
	 * @param attemptedDelta {Number}
	 */
	exports.animateX = function animateX(attemptedDelta, options) {

		var delta = this.xAllowedDelta(attemptedDelta);

		// [2] set up options
		options = options || {};
		// jquery animate has two interfaces.. we should support them both.
		options = _.isObject(options) ? options : {
			duration: arguments[1],
			easing: arguments[2],
			complete: arguments[3]
		};


		// [4] get current position
		var lastLeft = this.$el.position().left;

		// [5] set new progress function
		options.step = _.bind(function (now, tween) {

			// 'this' refers to the draggable object
			this.moveX(now - lastLeft, { force: true });

			// change lastLeft
			lastLeft = now;

		}, this);

		// run animation
		this.$el.animate({
			left: parseFloat(this.model.get('left')) + delta
		}, options);

		// return remainder
		return attemptedDelta - delta;
	};

	/**
	 * The same as moveY, but with animation.
	 *
	 * @method animateY
	 * @param attemptedDelta {Number}
	 */
	exports.animateY = function animateY(attemptedDelta, options) {
		var delta = this.yAllowedDelta(attemptedDelta);

		// [2] set up options
		options = options || {};
		// jquery animate has two interfaces.. we should support them both.
		options = _.isObject(options) ? options : {
			duration: arguments[1],
			easing: arguments[2],
			complete: arguments[3]
		};


		// [4] get current position
		var lastTop = this.$el.position().top;

		// [5] set new progress function
		options.step = _.bind(function (now, tween) {

			// 'this' refers to the draggable object
			this.moveY(now - lastTop, { force: true });

			// change lastTop
			lastTop = now;

		}, this);

		// run animation
		this.$el.animate({
			top: parseFloat(this.model.get('top')) + delta
		}, options);

		// return remainder
		return attemptedDelta - delta;
	};

	exports.animateToLeft = function animateToLeft(attemptedDelta, silent) {
		return -1 * this.animateX(-1 * attemptedDelta, silent);
	};

	exports.animateToRight = function animateToRight(attemptedDelta, silent) {
		return this.animateX(attemptedDelta, silent);
	};

	exports.animateToTop = function animateToTop(attemptedDelta, silent) {
		return -1 * this.animateY(-1 * attemptedDelta, silent);
	};

	exports.animateToBottom = function animateToBottom(attemptedDelta, silent) {
		return this.animateY(attemptedDelta, silent);
	};
});

/**
 *
 * @module backbone-ui-draggable
 * @submodule event-handlers
 */

define('__backbone-ui-draggable/event-handlers',['require','exports','module'],function (require, exports, module) {
	


	exports.mousedown = function mousedown(e) {

		if (this.$el.is(e.target) && e.which === 1 && this.draggableEnabled()) {

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

define('backbone-ui-draggable',['require','exports','module','lowercase-backbone','model-dock','lodash','jquery','./__backbone-ui-draggable/helpers','./__backbone-ui-draggable/when','./__backbone-ui-draggable/value-position','./__backbone-ui-draggable/delta-calc','./__backbone-ui-draggable/movement','./__backbone-ui-draggable/animation','./__backbone-ui-draggable/event-handlers'],function (require, exports, module) {
	

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

