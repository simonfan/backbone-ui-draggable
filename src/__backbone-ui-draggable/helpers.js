define(function (require, exports, module) {
	'use strict';

	exports.min = function min(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {

			return v1 < v2 ? v1 : v2;
		}
	};

	exports.max = function max(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {
			return v1 > v2 ? v1 : v2;
		}

	};



	exports.fitValueWithin = function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
	};


	exports.numberify = function numberify(v) {
		return parseInt(v, 10);
	};
});
