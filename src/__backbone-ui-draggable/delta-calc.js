define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var h = require('./helpers');

	// just to make it easier..
	var pf = parseFloat;

	/**
	 *
	 * Calculates the maximum delta allowed on x axis.
	 *
	 * @param xAllowedDelta
	 *
	 */
	exports.xAllowedDelta = function xAllowedDelta(attemptedDelta) {

		var modeld = this.modeld,
			previousLeft = pf(modeld.get('left')),

			// convert the attemptedDelta into attemptedLeft
			attemptedLeft = previousLeft + pf(attemptedDelta);

		var width = pf(this.$el.width());

		// minimums
		var minLeft = pf(modeld.get('minLeft')),
			minRight = pf(modeld.get('minRight')),
			min = h.max(minLeft, minRight - width);

		// maximums
		var maxLeft = pf(modeld.get('maxLeft')),
			maxRight = pf(modeld.get('maxRight')),
			max = h.min(maxLeft, maxRight - width);

			// get the allowed left
		var left = h.fitValueWithin(attemptedLeft, min, max);

			// return the allowed delta
		return left - previousLeft;
	};

	/**
	 *
	 * Calculates the maximum delta allowed on y axis.
	 *
	 * @param yAllowedDelta
	 *
	 */
	exports.yAllowedDelta = function yAllowedDelta(attemptedDelta) {

		var modeld = this.modeld,
			previousTop = pf(modeld.get('top')),

			// convert the attemptedDelta into attemptedTop
			attemptedTop = previousTop + pf(attemptedDelta);

		var height = pf(this.$el.height());

		// minimums
		var minTop = pf(modeld.get('minTop')),
			minBottom = pf(modeld.get('minBottom')),
			min = h.max(minTop, minBottom - height);

		// maximums
		var maxTop = pf(modeld.get('maxTop')),
			maxBottom = pf(modeld.get('maxBottom')),
			max = h.min(maxTop, maxBottom - height);

			// get the allowed top
		var top = h.fitValueWithin(attemptedTop, min, max);

		// return allowed delta
		return top - previousTop;
	};
});
