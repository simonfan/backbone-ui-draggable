define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers');

	/**
	 * Runs the initialization logic that is needed for the value-position
	 * system.
	 *
	 * @method initializeDraggableValuePosition
	 * @param options {Object}
	 */
	exports.initializeDraggableValuePosition = function initializeDraggableValuePosition(options) {


		// listen to changes on value attribute
		var model = this.model,
			valueAttribute = this.valueAttribute;

		this.listenTo(model, 'change:' + valueAttribute, function (model, value) {

			var pos = this.toPosition(model.get(valueAttribute));

			model.set({
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)
			});

		}, this);

		// initialize value/position
		if (model.get(valueAttribute)) {
			var pos = this.toPosition(model.get(valueAttribute));

			model.set({
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)
			});
		} else {
			model.set(valueAttribute, this.toValue(model));
		}

	};

	/**
	 * The name of the attribute to be set as 'value'
	 *
	 * @property valueAttribute
	 * @type String
	 */
	exports.valueAttribute = 'value';

	/**
	 * Sets the 'valueAttribute' attribute on the model.
	 *
	 * @method setValue
	 * @param value *
	 */
	exports.setValue = function setValue(value) {
		this.model.set(this.valueAttribute, value);
		return this;
	};

	/**
	 * Takes the backbone model of the draggalbe item
	 * and is expected to return a 'value'.
	 *
	 * @method toValue
	 * @param model {BB Model}
	 */
	exports.toValue = function toValue(model) {
		return 'At ' + model.get('top') + ' x ' + model.get('left');
	};

	/**
	 * Takes a value and is expected to return a position
	 * object containg { top: Number, left: Number }
	 *
	 * @method toPosition
	 * @param value
	 */
	exports.toPosition = function toPosition(value) {
		var values = value.split('x');

		var pos =  {
			top: parseFloat(values[0].replace(/[^0-9.\-]/g, '')),
			left: parseFloat(values[1].replace(/[^0-9.\-]/g, '')),
		};

		return pos;
	};
});
