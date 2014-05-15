define(function (require, exports, module) {
	'use strict';

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
			left: +this.model.get('left') + delta
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
			top: +this.model.get('top') + delta
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
