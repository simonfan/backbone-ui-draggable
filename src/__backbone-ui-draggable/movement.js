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
