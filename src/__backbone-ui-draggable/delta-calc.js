define(function (require, exports, module) {
	'use strict';

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
