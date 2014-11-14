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
	showHideGiphy();
}

function addGrammar(wordCount, finalWords){
	wordCount = parseInt(wordCount);
	var counter = 0;

	while((counter >= 0) && (counter < (wordCount - 11))){
		var randomNumber = parseInt(getRandomNumberBtwn(5, 11));
		counter = counter + randomNumber; 
		//keep track of what index we're at and make sure it never gets bigger than the array length

		finalWords[counter] = finalWords[counter] + '.'; // add punctuation
		finalWords[counter + 1] = (finalWords[counter + 1].charAt(0).toUpperCase()) + (finalWords[counter + 1].slice(1));
		//TODO: if it's a hastag, capitalize the one after it
	}
	finalWords[0] = finalWords[0].charAt(0).toUpperCase() + finalWords[0].slice(1);
	return finalWords;
}

function showHideGiphy(){
	var resultBox = $('#lorem-result'),
			gif = $('.gify-container'),
			loading = $('.loading');

	if(resultBox.css('display') === 'none'){//the first time we click submit
		resultBox.css('display', 'block');
		resultBox.animate({height: 300}, 'slow'); //figure out this height
	}
		
	gif.css('display', 'block'); //WHAT?
	loading.fadeIn();

	setTimeout(function(){//Remove and replace
		gif.fadeOut('slow', function(){
			resultBox.css('min-height', '300px');
			resultBox.css('height', 'auto');
			$('#outputWords').fadeIn(); //display the text
			$('h1').fadeOut('fast', function(){
				$('h1').text('Want more?');
				$('h1').fadeIn();
				$('.masterpiece').fadeIn();
			});
			changeCopy('Want to try again with different selections? No problem. Just fill out the form below & click the submit button again for another round of Taylor Swift Ipsum!');
		});
		loading.fadeOut('slow');
	}, 2000);
}

function changeCopy(copy){
	var intro = $('.intro-text');
	
	if(!intro.hasClass('updated')){
		intro.fadeOut('fast', function(){
			intro.text(copy)
				.fadeIn()
				.addClass('updated');
		});
	}
	else{ return; }
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

//GIPHY
$.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=blank+space&limit=100&api_key=12PnkylgHYUVgs',
    dataType: 'json',
    success: function(result){
    	//TODO: refactor this
    	var randomNumber = Math.round(Math.random() * result.data.length);
    	var gifUrl = result.data[randomNumber].images.fixed_height.url;
    	var gifWidth = result.data[randomNumber].images.fixed_height.width;
    	var gifHeight = result.data[randomNumber].images.fixed_height.height;

    	var containerWidth = (parseInt(gifWidth));
    	var containerHeight = (parseInt(gifHeight) + 50);
    	var calcMarginLeft = (containerWidth / 2) - (gifWidth / 2) + 'px';

    	var marginLeftGif = (parseInt(gifWidth) + 60) + 'px';

    	$('.gify-container').css('width', containerWidth);
    	$('.gify-container').css('height', containerHeight);

    	$('.gify').append($('<img>',{id:'gifyimg', src:gifUrl}));
    	$('#gifyimg').css('margin-left', calcMarginLeft);
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
	easterEgg.counter = easterEgg.counter || 0;
	easterEgg.counter ++;

	if(easterEgg.counter % 13 === 0){
		$('.snowContainer').css('background-image', 'url("https://usatlife.files.wordpress.com/2014/08/everswifttumblrcom.gif?w=1000")');//https://usatlife.files.wordpress.com/2014/08/everswifttumblrcom.gif?w=1000
		$('.snowContainer').addClass('snowing');
	}
	if((easterEgg.counter > 13) && (easterEgg.counter % 13 === 1)){
		$('.snowContainer').removeClass('snowing');
		$('.snowContainer').css('background-image', '');
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