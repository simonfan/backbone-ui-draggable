define(function (require, exports, module) {
	'use strict';

	function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
	}


	function numberify(v) {
		return parseInt(v, 10);
	}


	exports.moveX = function moveX(attemptedDelta, silent) {

		if (attemptedDelta) {

			if (this.axis.indexOf('x') === -1) {
				return attemptedDelta;
			}

			var model = this.model,
				previousLeft = parseInt(model.get('left'), 10),

				// convert the attemptedDelta into attemptedLeft
				attemptedLeft = previousLeft + attemptedDelta,

				minX = numberify(model.get('minX')),
				maxX = numberify(model.get('maxX')) - numberify(this.$el.width());

				// get the allowed left
			var left = fitValueWithin(attemptedLeft, minX, maxX);

			model.set('left', numberify(left));
			model.set(this.valueAttribute, this.toValue(model));


			var delta = model.get('left') - previousLeft;

			// events
			if (!silent) {
				this.trigger('move', this, { axis: 'x', delta: delta })
					.trigger('move-x', this, delta);
			}

			// return remainder
			return attemptedDelta - delta;

		} else {

			return 0;
		}
	};

	exports.moveY = function moveY(attemptedDelta, silent) {

		if (attemptedDelta) {

			if (this.axis.indexOf('y') === -1) {
				return attemptedDelta;
			}

			var model = this.model,
				previousTop = parseInt(model.get('top'), 10),

				// convert the attemptedDelta into attemptedLeft
				attemptedTop = previousTop + attemptedDelta,

				minY = numberify(model.get('minY')),
				maxY = numberify(model.get('maxY')) - numberify(this.$el.height());

				// get the allowed top
			var top = fitValueWithin(attemptedTop, minY, maxY);

			model.set('top', numberify(top));
			model.set(this.valueAttribute, this.toValue(model));

			var delta = model.get('top') - previousTop;

			// events
			if (!silent) {
				this.trigger('move', this, { axis: 'y', delta: delta })
					.trigger('move-y', this, delta);
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
