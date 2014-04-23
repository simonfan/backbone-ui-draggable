/**
 *
 * @module backbone-ui-draggable
 * @submodule event-handlers
 */

define(function (require, exports, module) {
	'use strict';


	exports.mousedown = function mousedown(e) {

		if (this.$el.is(e.target) && e.which === 1 && this.draggableEnabled()) {

			this.lastPosition = {
				x: e.pageX,
				y: e.pageY
			};


			var offset = this.$el.offset();

			this.handlePosition = {
				x: e.pageX - offset.left,
				y: e.pageY - offset.top
			};

			this.$window
				.on('mousemove', this.mousemove)
				.on('mouseup', this.mouseup);

			this.trigger('movestart', this);

			// preventDefault AND stopPropagation
			// http://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
			return false;

		}
	};

	exports.mousemove = function mousemove(e) {

		var last = this.lastPosition,
			x = e.pageX,
			y = e.pageY,
			dx = x - last.x,
			dy = y - last.y;


		var offset = this.$el.offset(),
			handleX = this.handlePosition.x + offset.left,
			handleY = this.handlePosition.y + offset.top;


		if ((dx > 0 && x > handleX ) || (dx < 0 && x < handleX)) {
			this.moveX(dx, {
				agent: 'mousemove'
			});
		}

		if ((dy > 0 && y > handleY) || (dy < 0 && y < handleY)) {
			this.moveY(dy, {
				agent: 'mousemove'
			});
		}

		last.x = x;
		last.y = y;

		// preventDefault AND stopPropagation
		return false;
	};

	exports.mouseup = function mouseup() {
		this.$window.off('mousemove', this.mousemove);

		delete this.lastPosition;

		this.trigger('movestop', this);
	};
});
