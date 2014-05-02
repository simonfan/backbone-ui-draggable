define(function (require, exports, module) {
	'use strict';

	var objectQuery = require('object-query');

	/**
	 * Create complex listeners
	 *
	 * @method when
	 * @param criteria {Object}
	 *     The criteria to be passed to objectQuery
	 * @param callback {Function}
	 * @param [context] {Object}
	 */
	module.exports = function when(criteria, callback, context) {

		var query = objectQuery(criteria),
			modeld = this.modeld;

		modeld.on('change', function () {

			if (query(modeld.toJSON())) {
				// run callback with the draggable as first argument.
				callback.apply(context, [this]);
			}
		}, this);
	};
});
