(function(){
	'use strict';

	window.utility = {
		getRandomNumberBtwn: function getRandomNumberBtwn(min, max){
			var seed = Math.round(Math.random() * max),
				result;

				if(seed < min){
					result = getRandomNumberBtwn(min, max);
				}
				else{
					result = seed;
				}
				
				return result;
		},
		changeHtml: function changeHtml(id, words){
			var location = document.getElementById(id);
			location.innerHTML = words;
		},
		refreshOnce: function refreshOnce(element, callback, options){

			if(!(element).hasClass('updated')){
				element.addClass('updated');
				
				if(callback && (typeof callback === 'function')){
					if(options){
						//accepts more than 1 param by setting options to an obj
						callback.call(element, options);
					}
					else{
						callback.call(element);
					}
				}
			
				return element;
			}
			
			else{ return; }
		},
		fadeReplaceText: function fadeReplaceText(options){
			var $el = options.element,
				copy = options.copy;

				$el.fadeOut('fast', function(){
				$el.text(copy)
					.fadeIn();
				});
		},
		showError: function showError(errorText){
			$('.errorMessage').text(errorText)
				.css('display', 'block')
				.fadeOut(9000, 'linear');
		}
	}
})();