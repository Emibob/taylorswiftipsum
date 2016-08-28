import $ from 'jquery';

(function() {
	var model = new window.Model(),
		view = new window.View({model: model, $el: $('#lorem-result')});
})();