(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'backbone-ui-draggable',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(BackboneUiDraggable, should) {
	'use strict';

	describe('BackboneUiDraggable base', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function () {
			var fruit = { name: 'banana' }
			fruit.should.have.property('name', 'banana');
		});
	});
});
