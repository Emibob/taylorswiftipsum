import $ from 'jquery';

window.View = function View(options) {
	'use strict';

	this.model = options.model || {};
	this.$el = options.$el;
	self = this;

	this.init = () => {
		self.model.getWordCount();
		self.model.updateCheckedAlbums();
		self.model.getLyricsByAlbums();
		self.model.randomizeWords();
		self.model.addGrammar();
		self.renderView();
	}

	this.renderView = () => {
		replaceGif();
		window.utility.changeHtml('outputWords', self.model.ipsum);
		$("html, body").animate({ scrollTop: 0 }, "slow");
		refreshView();
	}

	const refreshView = () => {

		var resultBox = $('#lorem-result'),
			gif = $('.giphy-container'),
			loading = $('.loading');

		//the first time submit is clicked we introduce the black box
		if(resultBox.css('display') === 'none') {
			resultBox.css('display', 'block');
			resultBox.animate({height: 300}, 'slow');
		}
	
		//show gif loading
		gif.css('display', 'block');
		loading.fadeIn();

		//wait then remove & refresh
		setTimeout(function() {
			//remove gif & loading
			loading.fadeOut('slow');

			gif.fadeOut('slow', function() {
			
				//fix black box height
				resultBox.css('min-height', '300px')
					.css('height', 'auto');

				//display new ipsum
				$('#outputWords').fadeIn();

				window.utility.refreshOnce($('h1'), window.utility.fadeReplaceText, {element: $('h1'), copy: 'Want more?'});
				window.utility.refreshOnce($('.intro-text'), window.utility.fadeReplaceText, {element: $('.intro-text'), copy: 'Want to try again with different selections? No problem. Just fill out the form below & click the submit button again for another round of Taylor Swift Ipsum!'});
				window.utility.refreshOnce($('.masterpiece'), $.fn.fadeIn);
				replaceGif();
			});
		}, 2000);
	}

	const replaceGif = () => {

		var randomNumber = window.utility.getRandomNumberBtwn(0, (window.allGifs.length - 1));

		var gifUrl = window.allGifs[randomNumber].images.fixed_height.url || 'http://media3.giphy.com/media/RrNielf11uMsU/200.gif';
	
  		var gifWidth = window.allGifs[randomNumber].images.fixed_height.width || '361';
  		var gifHeight = window.allGifs[randomNumber].images.fixed_height.height || '200';

		var containerWidth = (parseInt(gifWidth));
  		var containerHeight = (parseInt(gifHeight) + 50);
  		var calcMarginLeft = (containerWidth / 2) - (gifWidth / 2) + 'px';
  		var marginLeftGif = (parseInt(gifWidth) + 60) + 'px';

		$('#gifyimg').remove();

		$('.giphy-container').css('width', containerWidth);
  		$('.giphy-container').css('height', containerHeight);

  		$('.gif').append($('<img>',{id:'gifyimg', src:gifUrl}));
  		$('#gifyimg').css('margin-left', calcMarginLeft);
	}
 
	this.hideCurrentWords =  () => {
		var currentWords = $('#outputWords');
	
		if(currentWords.css('display') === 'block') {
			currentWords.css('display', 'none');
		}
		else { return; }
	}

	$('#lorem-submitum').on('click', this.hideCurrentWords);
	$('#lorem-submitum').on('click', this.init);
}