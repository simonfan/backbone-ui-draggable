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

	exports.moveX = function moveX(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('x') === -1) {
				return attemptedDelta;
			}

			var model = this.model;


			// get true delta
			var delta = options.force ? attemptedDelta : this.xAllowedDelta(attemptedDelta);

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


	exports.moveY = function moveY(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('y') === -1) {
				return attemptedDelta;
			}

			var model = this.model;

			// get allowed delta
			var delta = this.yAllowedDelta(attemptedDelta);

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
