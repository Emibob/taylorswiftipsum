(function(){

	var easterEgg = window.easterEgg || {};

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
		var todayIsXmas;

		if(easterEgg.xmas === true){
			$('h1').append('<img class="xmashat" src="imgs/xmashat.png" />');
			$('.albumCheckBoxes').append('<label id="christmasAlbum" class="hidden"><input class="album hidden" type="checkbox" value="soundsoftheseason"><span class="album-title">Sounds Of The Season</span></label>');
			$('#christmasAlbum').fadeIn(2000);
			todayIsXmas = true;
		}
		else{
			console.log('It\'s not christmas. Bummer.');
			todayIsXmas = false
		}

		return todayIsXmas;
	}

	$('#lorem-submitum').on('click', initEasterEggs);

})();