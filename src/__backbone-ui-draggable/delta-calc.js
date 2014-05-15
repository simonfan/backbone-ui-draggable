define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var h = require('./helpers');

	/**
	 *
	 * Calculates the maximum delta allowed on x axis.
	 *
	 * @param xAllowedDelta
	 *
	 */
	exports.xAllowedDelta = function xAllowedDelta(attemptedDelta) {

		attemptedDelta = +attemptedDelta;

		var model = this.model,
			previousLeft = +model.get('left'),

			// convert the attemptedDelta into attemptedLeft
			attemptedLeft = previousLeft + attemptedDelta;

		var width = +this.$el.width();

		// minimums
		var minLeft = +model.get('minLeft'),
			minRight = +model.get('minRight'),
			min = h.max(minLeft, minRight - width);

		// maximums
		var maxLeft = +model.get('maxLeft'),
			maxRight = +model.get('maxRight'),
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

		attemptedDelta = +attemptedDelta;

		var model = this.model,
			previousTop = +model.get('top'),

			// convert the attemptedDelta into attemptedTop
			attemptedTop = previousTop + attemptedDelta;

		var height = +this.$el.height();

		// minimums
		var minTop = +model.get('minTop'),
			minBottom = +model.get('minBottom'),
			min = h.max(minTop, minBottom - height);

		// maximums
		var maxTop = +model.get('maxTop'),
			maxBottom = +model.get('maxBottom'),
			max = h.min(maxTop, maxBottom - height);

			// get the allowed top
		var top = h.fitValueWithin(attemptedTop, min, max);

		// return allowed delta
		return top - previousTop;
	};
});
