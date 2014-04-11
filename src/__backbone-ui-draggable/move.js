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


	exports.moveX = function moveX(attemptedDelta, silent) {

		if (attemptedDelta) {

			if (this.axis.indexOf('x') === -1) {
				return attemptedDelta;
			}

			var model = this.model,
				// convert the attemptedDelta into attemptedLeft
				attemptedLeft = parseInt(model.get('left'), 10) + attemptedDelta;

				// get the allowed left
			var left = fitValueWithin(attemptedLeft, model.get('minX'), model.get('maxX'));

			model.set('left', left);
			model.set(this.valueAttribute, this.toValue(model));


			var previous = model.previous('left') || 0,
				delta = model.get('left') - previous;

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
				// convert the attemptedDelta into attemptedLeft
				attemptedTop = parseInt(model.get('top'), 10) + attemptedDelta;

				// get the allowed top
			var top = fitValueWithin(attemptedTop, model.get('minY'), model.get('maxY'));

			model.set('top', top);
			model.set(this.valueAttribute, this.toValue(model));

			var previous = model.previous('top') || 0,
				delta = model.get('top') - previous;

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
		return this.moveX(-1 * attemptedDelta, silent);
	};

	exports.moveToRight = function moveToRight(attemptedDelta, silent) {
		return this.moveX(attemptedDelta, silent);
	};

	exports.moveToTop = function moveToTop(attemptedDelta, silent) {
		return this.moveY(-1 * attemptedDelta, silent);
	};

	exports.moveToBottom = function moveToBottom(attemptedDelta, silent) {
		return this.moveY(attemptedDelta, silent);
	};
});
