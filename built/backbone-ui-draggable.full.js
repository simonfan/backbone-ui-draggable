define('__backbone-ui-draggable/helpers',['require','exports','module'],function (require, exports, module) {
	

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


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var isNumber = /^-?\d*(\.\d+)?$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
	};

});

//     subject
//     (c) simonfan
//     subject is licensed under the MIT terms.

//     Iterator
//     (c) simonfan
//     Iterator is licensed under the MIT terms.

define("subject",["lodash"],function(t){var r={initialize:function(){}},e=function(){};return e.prototype=r,e.proto=function(r,e){return t.isObject(r)?t.assign(this.prototype,r):this.prototype[r]=e,this},e.extend=function(r,e,n){var i,u;t.isFunction(r)?(i=t.assign({},e,{initialize:r}),u=n):t.isObject(r)&&(i=r||{},u=n);var o,s=this;return o=function(){var t=Object.create(o.prototype);return t.initialize.apply(t,arguments),t},t.assign(o,s,u),o.prototype=Object.create(s.prototype),o.prototype.constructor=o,o.proto(i),o.__super__=s.prototype,o},e.extend.bind(e)}),define("iterator/base",["subject","lodash"],function(t,r){var e=t(function(t,r){this.data=t,r=r||{},this.currentIndex=r.startAt||-1,this.options=r,this.evaluate=r.evaluate||r.evaluator||this.evaluate});e.proto({move:function(t){return this.index(this.currentIndex+t),this},evaluate:function(t){return t},evaluator:function(t){return this.evaluate=t,this},start:function(){return this.currentIndex=-1,this},end:function(){return this.currentIndex=this.length(),this},index:function(t){if(t>this.length()-1||0>t)throw new Error("No such index "+t);return this.currentIndex=t,this},countBefore:function(){return this.currentIndex+1},countAfter:function(){return this.length()-(this.currentIndex+1)},range:function(t,r){for(var e=[];r>=t;)e.push(this.at(t)),t++;return e},hasNext:function(){return this.currentIndex<this.length()-1},next:function(){return this.move(1),this.current()},nextN:function(t){for(var r=[],e=this.currentIndex+t-1;this.hasNext()&&this.currentIndex<=e;)r.push(this.next());return r},hasPrevious:function(){return this.currentIndex>0},previous:function(){return this.move(-1),this.current()},previousN:function(t){for(var r=[],e=this.currentIndex-t+1;this.hasPrevious()&&this.currentIndex>=e;)r.push(this.previous());return r},current:function(){return this.at(this.currentIndex)},value:function(){return this.data}}),e.proto({hasPrev:e.prototype.hasPrevious,prev:e.prototype.previous,prevN:e.prototype.previousN});var n=["map","filter","compact","difference"];return r.each(n,function(t){e.proto(t,function(){var e=r(this.data);e=e[t].apply(e,arguments);var n=this.constructor(e.value());return n})}),e}),define("iterator/array",["require","exports","module","./base","lodash"],function(t){var r=t("./base"),e=t("lodash"),n=r.extend({at:function(t){return this.evaluate(this.data[t],t)},length:function(){return this.data.length}}),i=["push","reverse","shift","sort","splice","unshift"];return e.each(i,function(t){n.proto(t,function(){return this.data[t].apply(this.data,arguments),this})}),e.each(["concat","slice"],function(t){n.proto(t,function(){var r=this.data[t].apply(this.data,arguments);return this.constructor(r)})}),n}),define("iterator/object",["require","exports","module","./base","lodash"],function(t){var r=t("./base"),e=t("lodash"),n=r.extend({initialize:function(t,n){n=n||{},r.prototype.initialize.apply(this,arguments),this.order=n.order||e.keys(t)},keyAt:function(t){return this.order[t]},at:function(t){var r=this.keyAt(t),e=this.data[r];return this.evaluate(e,r)},length:function(){return this.order.length},nextKey:function(){return this.keyAt(this.currentIndex+1)},currentKey:function(){return this.keyAt(this.currentIndex)},previousKey:function(){return this.keyAt(this.currentIndex-1)},map:function(t){var r={};return e.each(this.order,function(e,n){r[e]=t(this.data[e],e,n)}.bind(this)),this.constructor(r)}});return n.proto("constructor",n),n}),define("iterator/number",["require","exports","module","./base"],function(t){var r=t("./base"),e=r.extend({at:function(t){return this.evaluate(t,t)},length:function(){return this.data}});return e}),define("itr",["require","exports","module","./iterator/array","./iterator/object","./iterator/number","lodash"],function(t){var r=t("./iterator/array"),e=t("./iterator/object"),n=t("./iterator/number"),i=t("lodash"),u=function(t){var u;return i.isArray(t)?u=r:i.isObject(t)?u=e:i.isNumber(t)&&(u=n),u.apply(this,arguments)};return u.object=e,u.array=r,u.number=n,u});
//     Deep
//     (c) simonfan
//     Deep is licensed under the MIT terms.

define("__deep__/keys",["require","exports","module"],function(){return function(e){return e.replace(/\[(["']?)([^\1]+?)\1?\]/g,".$2").replace(/^\./,"").split(".")}}),define("__deep__/walker",["require","exports","module","lodash","itr","./keys"],function(e,r,t){var n=e("lodash"),i=e("itr"),s=e("./keys"),u=i.object.extend({nextStep:function(){var e=new RegExp("^"+this.currentKey()+"\\.");return this.nextKey().replace(e,"")},currentStep:function(){var e=new RegExp("^"+this.previousKey()+"\\.");return this.currentKey().replace(e,"")},previousStep:function(){var e=this.previousKey()||"";return n.last(e.split("."))},remainingSteps:function(){var e=new RegExp("^"+this.currentKey()+"\\.");return this.destination().replace(e,"")},destination:function(){return n.last(this.order)}});t.exports=function(e,r){r=n.isArray(r)?r:s(r);var t={"":e},i=[""];return n.every(r,function(s,u){var o=n.first(r,u+1).join(".");return i.push(o),e=e[s],t[o]=e,!n.isUndefined(e)}),u(t,{order:i})}}),define("__deep__/getset",["require","exports","module","lodash","./keys"],function(e,r){var t=e("lodash"),n=e("./keys");r.get=function(e,r){return r=t.isArray(r)?r:n(r),t.reduce(r,function(e,r){return e[r]},e)},r.set=function(e,i,s){i=t.isArray(i)?i:n(i);var u=i.pop();e=r.get(e,i),e[u]=s}}),define("deep",["require","exports","module","lodash","./__deep__/keys","./__deep__/walker","./__deep__/getset"],function(e){var r=e("lodash"),t={};return t.parseKeys=e("./__deep__/keys"),t.walker=e("./__deep__/walker"),r.extend(t,e("./__deep__/getset")),t});
//     Containers
//     (c) simonfan
//     Containers is licensed under the MIT terms.

define("containers",["lodash"],function(){function n(n,i){return _.all(i,function(i){return _.contains(n,i)})}function i(n,i){return _.any(i,function(i){return _.contains(n,i)})}function t(n,i){return n[0]<i&&i<n[1]}function r(n,i){return n[0]<=i&&i<=n[1]}function u(n,i,u){var e=u?t:r;return e=_.partial(e,n),_.isArray(i)?_.every(i,e):e(i)}return{containsAll:n,containsAny:i,exclusiveWithin:t,inclusiveWithin:r,within:u}});
//     ObjectMatcher
//     (c) simonfan
//     ObjectMatcher is licensed under the MIT terms.

define("__object-query__/operators/match",["require","exports","module","lodash"],function(e,n){var r=e("lodash");n.$matchSingle=function(e,n){return r.isRegExp(e)?e.test(n):e===n},n.$match=function(e,t){return r.isArray(t)?r.any(t,function(r){return n.$matchSingle(e,r)}):n.$matchSingle(e,t)}}),define("__object-query__/operators/range",["require","exports","module"],function(e,n){n.$lt=function(e,n){return e>n},n.$lte=function(e,n){return e>=n},n.$gt=function(e,n){return n>e},n.$gte=function(e,n){return n>=e}}),define("__object-query__/operators/set",["require","exports","module","lodash","containers"],function(e,n){var r=e("lodash"),t=e("containers");n.$in=function(e,n){return r.isArray(n)?t.containsAny(e,n):r.contains(e,n)},n.$nin=function(e,n){return r.isArray(n)?!t.containsAny(e,n):!r.contains(e,n)},n.$all=function(e,n){return t.containsAll(n,e)}}),define("__object-query__/operators/boolean",["require","exports","module"],function(e,n){n.$e=function(){},n.$ne=function(){},n.$not=function(){},n.$or=function(){},n.$and=function(){},n.$exists=function(){}}),define("__object-query__/operators/index",["require","exports","module","lodash","deep","containers","./match","./range","./set","./boolean"],function(e,n){var r=e("lodash");e("deep"),e("containers"),r.extend(n,e("./match"),e("./range"),e("./set"),e("./boolean")),n.evaluateValue=function(e,t){return r.isObject(e)&&!r.isRegExp(e)?r.every(e,function(e,r){var o=n[r];if(o)return o(e,t);throw new Error("The operator "+r+" is not supported by object-query.")}):n.$match(e,t)}}),define("__object-query__/match",["require","exports","module","lodash","deep","./operators/index"],function(e,n,r){var t=e("lodash"),o=e("deep"),i=e("./operators/index"),a=/[0-9]+/,u=function(e,n,r){return t.any(n,function(n){return c(e,n,r)})},c=r.exports=function(e,n,r){for(var c,s=o.walker(n,r);s.hasNext();){var f=s.next();{if(!s.hasNext()){c=i.evaluateValue(e,f);break}if(t.isArray(f)&&!a.test(s.nextStep())){c=u(e,f,s.remainingSteps());break}}}return c}}),define("__object-query__/find",["require","exports","module","lodash","deep","./operators/index"],function(e,n,r){var t=e("lodash"),o=e("deep"),i=e("./operators/index"),a=/[0-9]+/,u=function(e,n,r){return t.any(n,function(n){return c(e,n,r)})},c=r.exports=function(e,n,r){for(var c,s=o.walker(n,r);s.hasNext();){var f=s.next();{if(!s.hasNext()){c=i.evaluateValue(e,f);break}if(t.isArray(f)&&!a.test(s.nextStep())){c=u(e,f,s.remainingSteps());break}}}return c}}),define("object-query",["require","exports","module","lodash","./__object-query__/match","./__object-query__/find"],function(e){function n(e,n){return r.every(e,function(e,r){return t(e,n,r)})}var r=e("lodash"),t=e("./__object-query__/match");e("./__object-query__/find");var o=function(e){return e=e||{},r.partial(n,e)},i=["every","all","some","any","filter","find","reject"];return r.each(i,function(e){o[e]=function(n,t){return r[e](n,o(t))}}),o});
define('__backbone-ui-draggable/when',['require','exports','module','object-query'],function (require, exports, module) {
	

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
			model = this.model;

		model.on('change', function () {

			if (query(model.toJSON())) {
				// run callback with the draggable as first argument.
				callback.apply(context, [this]);
			}
		}, this);
	};
});

define('__backbone-ui-draggable/value-position',['require','exports','module','./helpers'],function (require, exports, module) {
	

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

define('__backbone-ui-draggable/delta-calc',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

	var _ = require('lodash');

	var h = require('./helpers');

	exports.xAllowedDelta = function xAllowedDelta(attemptedDelta) {

		var model = this.model,
			previousLeft = parseFloat(model.get('left')),

			// convert the attemptedDelta into attemptedLeft
			attemptedLeft = previousLeft + attemptedDelta;

		var width = parseFloat(this.$el.width());

		// minimums
		var minLeft = parseFloat(model.get('minLeft')),
			minRight = parseFloat(model.get('minRight')),
			min = h.max(minLeft, minRight - width);

		// maximums
		var maxLeft = parseFloat(model.get('maxLeft')),
			maxRight = parseFloat(model.get('maxRight')),
			max = h.min(maxLeft, maxRight - width);

			// get the allowed left
		var left = h.fitValueWithin(attemptedLeft, min, max);

			// return the allowed delta
		return left - previousLeft;
	};

	exports.yAllowedDelta = function yAllowedDelta(attemptedDelta) {

		var model = this.model,
			previousTop = parseFloat(model.get('top')),

			// convert the attemptedDelta into attemptedTop
			attemptedTop = previousTop + attemptedDelta;

		var height = parseFloat(this.$el.height());

		// minimums
		var minTop = parseFloat(model.get('minTop')),
			minBottom = parseFloat(model.get('minBottom')),
			min = h.max(minTop, minBottom - height);

		// maximums
		var maxTop = parseFloat(model.get('maxTop')),
			maxBottom = parseFloat(model.get('maxBottom')),
			max = h.min(maxTop, maxBottom - height);

			// get the allowed top
		var top = h.fitValueWithin(attemptedTop, min, max);

		// return allowed delta
		return top - previousTop;
	};
});

define('__backbone-ui-draggable/movement',['require','exports','module','lodash','./helpers'],function (require, exports, module) {
	

	var _ = require('lodash');

	var h = require('./helpers');

	exports.moveX = function moveX(attemptedDelta, options) {

		if (attemptedDelta) {

			options = options || {};

			if (this.axis.indexOf('x') === -1) {
				return attemptedDelta;
			}

			var model = this.model;


			// get true delta
			var delta = options.force ? attemptedDelta : this.xAllowedDelta(attemptedDelta);

			// set left
			model.set('left', parseFloat(model.get('left')) + delta);

			// set value attribute
			model.set(this.valueAttribute, this.toValue(model));

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

			var model = this.model;

			// get allowed delta
			var delta = this.yAllowedDelta(attemptedDelta);

			// set new top
			model.set('top', parseFloat(model.get('top')) + delta);

			// update value
			model.set(this.valueAttribute, this.toValue(model));

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

define('__backbone-ui-draggable/animation',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	/**
	 * The same as moveX, but with animation.
	 *
	 * @method animateX
	 * @param attemptedDelta {Number}
	 */
	exports.animateX = function animateX(attemptedDelta, options) {

		var delta = this.xAllowedDelta(attemptedDelta);

		// [2] set up options
		options = options || {};
		// jquery animate has two interfaces.. we should support them both.
		options = _.isObject(options) ? options : {
			duration: arguments[1],
			easing: arguments[2],
			complete: arguments[3]
		};


		// [4] get current position
		var lastLeft = this.$el.position().left;

		// [5] set new progress function
		options.step = _.bind(function (now, tween) {

			// 'this' refers to the draggable object
			this.moveX(now - lastLeft, { force: true });

			// change lastLeft
			lastLeft = now;

		}, this);

		// run animation
		this.$el.animate({
			left: parseFloat(this.model.get('left')) + delta
		}, options);

		// return remainder
		return attemptedDelta - delta;
	};

	/**
	 * The same as moveY, but with animation.
	 *
	 * @method animateY
	 * @param attemptedDelta {Number}
	 */
	exports.animateY = function animateY(attemptedDelta, options) {
		var delta = this.yAllowedDelta(attemptedDelta);

		// [2] set up options
		options = options || {};
		// jquery animate has two interfaces.. we should support them both.
		options = _.isObject(options) ? options : {
			duration: arguments[1],
			easing: arguments[2],
			complete: arguments[3]
		};


		// [4] get current position
		var lastTop = this.$el.position().top;

		// [5] set new progress function
		options.step = _.bind(function (now, tween) {

			// 'this' refers to the draggable object
			this.moveY(now - lastTop, { force: true });

			// change lastTop
			lastTop = now;

		}, this);

		// run animation
		this.$el.animate({
			top: parseFloat(this.model.get('top')) + delta
		}, options);

		// return remainder
		return attemptedDelta - delta;
	};

	exports.animateToLeft = function animateToLeft(attemptedDelta, silent) {
		return -1 * this.animateX(-1 * attemptedDelta, silent);
	};

	exports.animateToRight = function animateToRight(attemptedDelta, silent) {
		return this.animateX(attemptedDelta, silent);
	};

	exports.animateToTop = function animateToTop(attemptedDelta, silent) {
		return -1 * this.animateY(-1 * attemptedDelta, silent);
	};

	exports.animateToBottom = function animateToBottom(attemptedDelta, silent) {
		return this.animateY(attemptedDelta, silent);
	};
});

/**
 *
 * @module backbone-ui-draggable
 * @submodule event-handlers
 */

define('__backbone-ui-draggable/event-handlers',['require','exports','module'],function (require, exports, module) {
	


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

//     BackboneUiDraggable
//     (c) simonfan
//     BackboneUiDraggable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module BackboneUiDraggable
 */

define('backbone-ui-draggable',['require','exports','module','lowercase-backbone','model-dock','lodash','jquery','./__backbone-ui-draggable/helpers','./__backbone-ui-draggable/when','./__backbone-ui-draggable/value-position','./__backbone-ui-draggable/delta-calc','./__backbone-ui-draggable/movement','./__backbone-ui-draggable/animation','./__backbone-ui-draggable/event-handlers'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		modelDock = require('model-dock'),
		_ = require('lodash'),
		$ = require('jquery');

	var helpers = require('./__backbone-ui-draggable/helpers');

	var draggable = module.exports = modelDock.extend({
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.call(this, options);

			this.initializeModelDock(options);

			this.initializeUIDraggable(options);
		},

		initializeUIDraggable: function initializeUIDraggable(options) {

			// bind methods
			_.bindAll(this, 'mousedown', 'mousemove', 'mouseup');

			// add class
			this.$el.addClass(this.draggableClass);

			// window
			this.$window = $(window);

			// canvas
			this.$canvas = options.canvas || this.canvas || this.$el.parent();

			var pos = this.$el.position();

			var data = $.extend({
				draggableStatus: 'enabled',
				disabled: false,
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)

			}, options);

			// set initial data
			var model = this.model;
			model.set(data);

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


			// initialize value-position system.
			this.initializeDraggableValuePosition(options);
		},

		/**
		 * The class to be added to the draggable html eleemnt.
		 *
		 * @property draggableClass
		 * @type String
		 */
		draggableClass: 'draggable',

		events: {
			mousedown: 'mousedown',
		},


		when: require('./__backbone-ui-draggable/when'),

		/**
		 * Set the disabled option to true.
		 *
		 * @method disableDraggable
		 */
		disableDraggable: function disableDraggable() {
			this.model.set('draggableStatus', 'disabled');
		},

		/**
		 * Set the disabled option to false.
		 *
		 * @method enableDraggable
		 */
		enableDraggable: function enableDraggable() {
			this.model.set('draggableStatus', 'enabled');
		},

		draggableEnabled: function draggableEnabled() {
			return this.model.get('draggableStatus') === 'enabled';
		},

		axis: 'xy',

		map: {
			left: '->css:left',
			top: '->css:top',
		},

		stringifiers: {
			left: helpers.stringifyPositionalValue,
			top: helpers.stringifyPositionalValue,
		}
	});

	// extend
	draggable.proto(require('./__backbone-ui-draggable/value-position'));
	draggable.proto(require('./__backbone-ui-draggable/delta-calc'));
	draggable.proto(require('./__backbone-ui-draggable/movement'));
	draggable.proto(require('./__backbone-ui-draggable/animation'));
	draggable.proto(require('./__backbone-ui-draggable/event-handlers'));
});

