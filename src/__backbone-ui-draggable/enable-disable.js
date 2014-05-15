/**
 *
 * @module backbone-ui-draggable
 * @submodule event-handlers
 */

define(function (require, exports, module) {
	'use strict';

	exports.initializeUIDraggableEnableDisable = function initializeUIDraggableEnableDisable(options) {
		var model = this.model;

		// listen to enable and disable option changes
		this.listenTo(model, 'change:draggableStatus', function (model) {

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
		this.model.set('draggableStatus', 'disabled');
	};

	/**
	 * Set the disabled option to false.
	 *
	 * @method enableDraggable
	 */
	exports.enableDraggable = function enableDraggable() {
		this.model.set('draggableStatus', 'enabled');
	};

	exports.draggableEnabled = function draggableEnabled() {
		return this.model.get('draggableStatus') === 'enabled';
	};
});
