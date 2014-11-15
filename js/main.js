//EVENT LISTENERS
$('#lorem-submitum').click(generateIpsum);
$('#lorem-submitum').click(hideCurrentWords);
$('#lorem-submitum').click(initEasterEggs);

//MAIN FUNCTIONALITY
function getDesiredWordCount(){
	var defaultNumber = "130",
			inputNumber = $('#numberWords').val() || defaultNumber;

	if(inputNumber >= 500000){
		inputNumber = defaultNumber;
		showError('Trying to break me like a promise? Please choose a smaller number.');
	}
	if(inputNumber.match(/[^0-9]/g)){
		inputNumber = defaultNumber;
		showError('Please enter a numeric value');
	}
	return inputNumber;
};

function getSelectedAlbumLyrics(){
	var albums = [],
			allLyrics = allLyrics || [],
			checkboxes = $('.album');

	//get all the album values that are checked
	for(var j = 0; j < checkboxes.length; j ++){
		if(checkboxes[j].checked === true){
			albums.push(checkboxes[j].value);
		}
	}
	//concat the selected arrays
	for(var i = 0; i < albums.length; i ++){
		allLyrics = allLyrics.concat(lingo[albums[i]]);
	}
	return allLyrics;
}

function generateIpsum(){
	var storeWords = [],
			wordCount = getDesiredWordCount(),
			combinedWords = getSelectedAlbumLyrics(),
			counter = 0,
			finalWords,
			output;

	while(counter <= wordCount){
		//get a new random number each time within the range of the combinedWords array
		var randomNumber = Math.round(Math.random() * (combinedWords.length - 1));

		var spaces = combinedWords[randomNumber].match(/\s/g) || [];
		counter = counter + (spaces.length + 1);
		storeWords.push(combinedWords[randomNumber]);
	}

	//combine storeWords into 1 string to split them by each word, lob off extra words
	finalWords = storeWords.join(' ').split(' ').splice(0, wordCount);
	//add grammar
	output = addGrammar(wordCount, finalWords).join(' ');

	changeHtml('outputWords', output);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	refreshView();
}

function addGrammar(wordCount, finalWords){
	wordCount = parseInt(wordCount);
	var counter = 0;

	while((counter >= 0) && (counter < (wordCount - 12))){
		var randomNumber = parseInt(getRandomNumberBtwn(5, 11));
		counter = counter + randomNumber;//include the next capitalized word 
		//keep track of what index we're at and make sure it never gets bigger than the array length

		finalWords[counter] = finalWords[counter] + '.'; // add punctuation
		finalWords[counter + 1] = (finalWords[counter + 1].charAt(0).toUpperCase()) + (finalWords[counter + 1].slice(1));
		//TODO: if it's a hastag, capitalize the one after it
	}
	//capitalize the first word of paragraph & add punctuation to last word of paragraph
	finalWords[0] = finalWords[0].charAt(0).toUpperCase() + finalWords[0].slice(1);
	finalWords[finalWords.length - 1] = finalWords[finalWords.length - 1] + '.';
	return finalWords;
}

function refreshView(){
	var resultBox = $('#lorem-result'),
			gif = $('.giphy-container'),
			loading = $('.loading');

	//the first time submit is clicked we introduce the black box
	if(resultBox.css('display') === 'none'){
		resultBox.css('display', 'block');
		resultBox.animate({height: 300}, 'slow');
	}
	
	//show gif loading
	gif.css('display', 'block');
	loading.fadeIn();

	//wait then remove & refresh
	setTimeout(function(){
		
		//remove gif & loading
		loading.fadeOut('slow');
		gif.fadeOut('slow', function(){
			
			//fix black box height
			resultBox.css('min-height', '300px')
				.css('height', 'auto');

			//display new ipsum
			$('#outputWords').fadeIn();

			refreshOnce($('h1'), fadeReplaceText, {element: $('h1'), copy: 'Want more?'});
			refreshOnce($('.intro-text'), fadeReplaceText, {element: $('.intro-text'), copy: 'Want to try again with different selections? No problem. Just fill out the form below & click the submit button again for another round of Taylor Swift Ipsum!'});
			refreshOnce($('.masterpiece'), $.fn.fadeIn);
			replaceGif();
		});

	}, 2000);
}

function replaceGif(){

	var randomNumber = getRandomNumberBtwn(0, (window.allGifs.length - 1));

	var gifUrl = window.allGifs[randomNumber].images.fixed_height.url;
  var gifWidth = window.allGifs[randomNumber].images.fixed_height.width;
  var gifHeight = window.allGifs[randomNumber].images.fixed_height.height;
	
	var containerWidth = (parseInt(gifWidth));
  var containerHeight = (parseInt(gifHeight) + 50);
  var calcMarginLeft = (containerWidth / 2) - (gifWidth / 2) + 'px';

  var marginLeftGif = (parseInt(gifWidth) + 60) + 'px';


	$('#gifyimg').remove();

	$('.giphy-container').css('width', containerWidth);
  $('.giphy-container').css('height', containerHeight);

  $('.gify').append($('<img>',{id:'gifyimg', src:gifUrl}));
  $('#gifyimg').css('margin-left', calcMarginLeft);
}

function hideCurrentWords(){
	var currentWords = $('#outputWords');
	
	if(currentWords.css('display') === 'block'){
		currentWords.css('display', 'none');
	}
	else{ return; }
}

function changeHtml(id, words){
	var location = document.getElementById(id);
	location.innerHTML = words;
}

//HELPER FUNCTIONS//
function showError(errorText){
	$('.errorMessage').text(errorText)
		.css('display', 'block')
		.fadeOut(9000, 'linear');
}

function getRandomNumberBtwn(min, max){
	var seed = Math.round(Math.random() * max),
			result;

	if(seed < min){
		result = getRandomNumberBtwn(min, max);
	}
	else{
		result = seed;
	}
	return result;
}

//update the given element's state and call function once
function refreshOnce(element, callback, options){
	
	// if(arguments.length >= 3){ var options = Array.prototype.slice.call(arguments, 2); }

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
}

function fadeReplaceText(options){
	var $el = options.element,
			copy = options.copy;

	$el.fadeOut('fast', function(){
		$el.text(copy)
			.fadeIn();
	});
}

//GIPHY
$.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=blank+space&limit=100&api_key=12PnkylgHYUVgs',
    dataType: 'json',
    success: function(result){
    	var allGifs = [];

    	_.each(result.data, function(gifInfo){
    		allGifs.push(gifInfo);
    	});

    	window.allGifs = allGifs;

    	replaceGif();
    }
  });

//TUMBLR HASHTAGS
$.ajax({
    url: 'http://api.tumblr.com/v2/blog/taylorswift.tumblr.com/posts?api_key=lFtJkzttWGO9Gz1xH6isQNVPidE4xIVV5XqPqzMfTzeg6vfUMw',
    dataType: 'jsonp',
    success: function(result){

      var hashTagArray = [];

      	_.each(result.response.posts, function(post){
      		_.each(post.tags, function(tag){

      			hashTagArray.push('#' + tag);

      		});
      	});
      	window.lingo.hashtags = hashTagArray;

    }
  });

//EASTER EGGS
var easterEgg = easterEgg || {};

function initEasterEggs(){
	var snow = $('.snowContainer');

	easterEgg.counter = easterEgg.counter || 0;

	easterEgg.counter ++;

	if(easterEgg.counter % 13 === 0){
		snow.css('background-image', 'url("https://usatlife.files.wordpress.com/2014/08/everswifttumblrcom.gif?w=1000")');//https://usatlife.files.wordpress.com/2014/08/everswifttumblrcom.gif?w=1000
		snow.addClass('snowing');
	}
	if((easterEgg.counter > 13) && (easterEgg.counter % 13 === 1)){
		snow.removeClass('snowing');
		snow.css('background-image', '');
	}
}

function isChristmas(forcedValue){
	var today = new Date();

	easterEgg.xmas = forcedValue ? forcedValue : ((today.getMonth() === 11) && (today.getDay() === 25));
	christmasTheme();
}

function christmasTheme(){
	if(easterEgg.xmas === true){
		$('h1').append('<img class="xmashat" src="imgs/xmashat.png" />');
		$('.albumCheckBoxes').append('<label id="christmasAlbum" class="hidden"><input class="album hidden" type="checkbox" value="soundsoftheseason"><span class="album-title">Sounds Of The Season</span></label>');
		$('#christmasAlbum').fadeIn(2000);
	}
	else{
		console.log('It\'s not christmas. Bummer.');
	}
}