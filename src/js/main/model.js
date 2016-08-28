import $ from 'jquery';

(function(){
window.Model = function Model(){
	'use strict';

	this.wordCount = 130;
	this.albums = {
		ts: true,
		nineteenEightyNine: false,
		red: false,
		speakNow: false,
		fearless: false,
		taylorSwift: false,
		soundsoftheseason: false
	}
	this.rawLyrics = 'who run the world';
	this.getWordCount = function getWordCount(){
		var self = this;

		this.wordCount = $('#numberWords').val() || '130';

		if(this.wordCount >= 500000){
			window.utility.showError('Trying to break me like a promise? Generating default 130 words.');
			self.wordCount = '130';
		}
		else if(this.wordCount.match(/[^0-9]/g)){
			window.utility.showError('Word count should be numeric value, generating default 130 words.');
			self.wordCount = '130';
		}

		return this.wordCount;
	}
	this.getLyricsByAlbums = function getAlbums(){
		var selectedAlbums = [],
			allLyrics = [];

		//get albums set to true
		for(var album in this.albums){
			if(this.albums[album] === true){
				selectedAlbums.push(album);
			}
		}
		//get all associated lyrics
		for(var i = 0; i < selectedAlbums.length; i ++){
			allLyrics = allLyrics.concat(lingo[selectedAlbums[i]]);
		}

		this.rawLyrics = allLyrics;
		return allLyrics;
	}
	this.updateCheckedAlbums = function updateCheckedAlbums(){

		for(var i = 0; i < $('.album').length; i ++){
			if($('.album')[i].checked === true){
				this.albums[$('.album')[i].value] = true;
			}
			else{
				this.albums[$('.album')[i].value] = false;
			}
		}
		return this.albums;
	}
	this.randomizeWords = function randomizeWords(){
		var storeWords = [],
			wordCount = this.wordCount,
			combinedWords = this.rawLyrics,
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
		this.randomizedWords = finalWords;
		return finalWords;
	}
	this.randomizedWords = 'randomized words';
	this.addGrammar = function addGrammar(){
		var wordCount = parseInt(this.wordCount),
		words = this.randomizedWords,
		counter = 0;

		while((counter >= 0) && (counter < (wordCount - 12))){
			var randomNumber = parseInt(window.utility.getRandomNumberBtwn(5, 11));
			counter = counter + randomNumber;//include the next capitalized word 
			//keep track of what index we're at and make sure it never gets bigger than the array length

			words[counter] = words[counter] + '.'; // add punctuation
			words[counter + 1] = (words[counter + 1].charAt(0).toUpperCase()) + (words[counter + 1].slice(1));
		}
		//capitalize the first word of paragraph & add punctuation to last word of paragraph
		words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
		words[words.length - 1] = words[words.length - 1] + '.';

		this.ipsum = words.join(' ');

		return words.join(' ');
	}
	this.ipsum = 'taylorSwiftIpsum.com';
}
})();