define(['backbone', 'module'], function (Backbone , module ) {

	module.exports = new Backbone.Model({
		top: 50,
		left: 230,

		minLeft: 20,
		maxLeft: 500,

		minRight: 0,
		maxRight: 800,

		minTop: 30,
		maxTop: 500,

		minBottom: 200,
		maxBottom: 400,
	});

});
