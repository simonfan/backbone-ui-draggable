/**
 *
 * @module backbone-ui-draggable
 * @submodule event-handlers
 */

define(function (require, exports, module) {
	'use strict';

	exports.initializeUIDraggableEnableDisable = function initializeUIDraggableEnableDisable(options) {
		var modeld = this.modeld;

		// listen to enable and disable option changes
		this.listenTo(modeld, 'change:draggableStatus', function (model) {

			if (this.draggableEnabled()) {
				// is enabled
				this.$el
					.removeClass(this.draggableClass + '-disabled')
					.addClass(this.draggableClass + '-enabled');
			} else {
				// is disabled
				this.$el
					.removeClass(this.draggableClass + '-enabled')
					.addClass(this.draggableClass + '-disabled');
			}

		});
	};



	/**
	 * Set the disabled option to true.
	 *
	 * @method disableDraggable
	 */
	exports.disableDraggable = function disableDraggable() {
		this.modeld.set('draggableStatus', 'disabled');
	};

	/**
	 * Set the disabled option to false.
	 *
	 * @method enableDraggable
	 */
	exports.enableDraggable = function enableDraggable() {
		this.modeld.set('draggableStatus', 'enabled');
	};

	exports.draggableEnabled = function draggableEnabled() {
		return this.modeld.get('draggableStatus') === 'enabled';
	};
});
