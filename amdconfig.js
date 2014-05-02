require.config({
	urlArgs: 'bust=0.3751750059891492',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'backbone-ui-draggable': 'index',
		backbone: '../bower_components/backbone/backbone',
		jquery: '../bower_components/jquery/dist/jquery',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
		'jquery-ui-position': '../bower_components/jquery-ui/ui/jquery-ui',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'model-dock': '../bower_components/model-dock/built/model-dock',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		subject: '../bower_components/subject/built/subject',
		containers: '../bower_components/containers/built/containers',
		deep: '../bower_components/deep/built/deep',
		itr: '../bower_components/itr/built/itr',
		'object-query': '../bower_components/object-query/built/object-query',
		'bb-dock': '../bower_components/bb-dock/built/bb-dock',
		'bb-model-view': '../bower_components/bb-model-view/built/bb-model-view'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		},
		'jquery-ui': {
			deps: [
				'jquery'
			]
		}
	}
});
