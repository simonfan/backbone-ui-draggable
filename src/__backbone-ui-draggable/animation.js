define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	function update(delta) {

		this.moveX(delta.left, { force: true });
		this.moveY(delta.top, { force: true });
	};


	/**
	 * Call animations as if you were running on plain jquery.
	 * We'll just adjust the model to sync itself with the new positions.
	 *
	 * @method animate
	 * @param properties {Object}
	 * @param options {Object}
	 */
	exports.animate = function animate(properties, options) {

		// [1] check allowed deltas
		var top = parseFloat(properties.top),
			left = parseFloat(properties.left);

		// remainders
		var remainders = {};

		if (!isNaN(top)) {
			var currTop = parseFloat(this.get('top')),
				attemptedDelta = top - currTop,
				delta = this.yAllowedDelta(attemptedDelta);

			properties.top = currTop + delta;

			remainders.top = attemptedDelta - delta;
		}

		if (!isNaN(left)) {
			var currLeft = parseFloat(this.get('left')),
				attemptedDelta = left - currLeft,
				delta = this.xAllowedDelta(attemptedDelta);

			properties.left = currLeft + delta;

			remainders.left = attemptedDelta - delta;
		}


		// [2] set up options
		options = options || {};

		// jquery animate has two interfaces.. we should support them both.
		options = _.isObject(options) ? options : {
			duration: arguments[1],
			easing: arguments[2],
			complete: arguments[3]
		};


		// [3] get the original progress function
		var originalProgressFunc = options.progress;

		// [4] get current position
		var lastPos = this.$el.position();


		// [5] set new progress function
		options.progress = _.bind(function () {

			// 'this' refers to the draggable object

			// first call the original progress function
			if (originalProgressFunc) {
				originalProgressFunc.apply(this.$el, arguments);
			}

			var currPos = this.$el.position(),
				delta = {
					top: currPos.top - lastPos.top,
					left: currPos.left - lastPos.left
				};

			update.call(this, delta);

			// change lastPos
			lastPos = currPos;

		}, this);

		// run animation
		this.$el.animate(properties, options);

		return this;
	};





	exports.animateX = function animateX(attemptedDelta, options) {

		var delta = this.yAllowedDelta(attemptedDelta);



		// [2] set up options
		options = options || {};

		// jquery animate has two interfaces.. we should support them both.
		options = _.isObject(options) ? options : {
			duration: arguments[1],
			easing: arguments[2],
			complete: arguments[3]
		};


		// [3] get the original progress function
		var originalProgressFunc = options.progress;

		// [4] get current position
		var lastPos = this.$el.position();


		// [5] set new progress function
		options.progress = _.bind(function () {

			// 'this' refers to the draggable object

			// first call the original progress function
			if (originalProgressFunc) {
				originalProgressFunc.apply(this.$el, arguments);
			}

			var currPos = this.$el.position(),
				delta = {
					top: currPos.top - lastPos.top,
					left: currPos.left - lastPos.left
				};

			update.call(this, delta);

			// change lastPos
			lastPos = currPos;

		}, this);

		// run animation
		this.$el.animate(properties, options);

		return this;

	};

	exports.animateY = function animateY(attemptedDelta, options) {

	};
});
