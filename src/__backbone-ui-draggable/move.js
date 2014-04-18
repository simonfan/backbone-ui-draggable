define(function (require, exports, module) {
	'use strict';

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

			var width = h.numberify(this.$el.width());

			// minimums
			var minLeft = h.numberify(model.get('minLeft')),
				minRight = h.numberify(model.get('minRight')),
				min = h.max(minLeft, minRight - width);

			// maximums
			var maxLeft = h.numberify(model.get('maxLeft')),
				maxRight = h.numberify(model.get('maxRight')),
				max = h.min(maxLeft, maxRight - width);

				// get the allowed left
			var left = h.fitValueWithin(attemptedLeft, min, max);

			model.set('left', h.numberify(left));
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

			var height = h.numberify(this.$el.height());

			// minimums
			var minTop = h.numberify(model.get('minTop')),
				minBottom = h.numberify(model.get('minBottom')),
				min = h.max(minTop, minBottom - height);

			// maximums
			var maxTop = h.numberify(model.get('maxTop')),
				maxBottom = h.numberify(model.get('maxBottom')),
				max = h.min(maxTop, maxBottom - height);

				// get the allowed top
			var top = h.fitValueWithin(attemptedTop, min, max);

			model.set('top', h.numberify(top));
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
