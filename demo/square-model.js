define(['backbone', 'module'], function (Backbone , module ) {

	module.exports = new Backbone.Model({
		minLeft: 20,
		maxLeft: 500,

		minRight: 0,
		maxRight: 800,

		minTop: 30,
		maxTop: 500,

		minBottom: 300,
		maxBottom: 560,
	});

});
