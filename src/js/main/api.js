(function(global){
	var urlParams = location.search;

	var countParam = urlParams.match(/\?count=\d+/i); //matches '?count=numbers'

	if (!countParam){
		console.log('there was an error parsing ' + urlParams + ' please make sure you are using the param count followed by number i.e. ?count=100');
	}

	var wordCount = countParam.toString().match(/\d+/);

	if (!wordCount){
		console.log('there was an error parsing ' + countParam + ' please make sure you are using the param count followed by number i.e. ?count=100')
	}

	console.log('wordCount is ' + wordCount);

	function getIpsum(wordCount){
		var count = parseInt(wordCount);
		return 'I want to get ' + count + ' words';
	}

	var taylorSwiftIpsumJson = {
		url: location.href,
		date: new Date(),
		wordCount : parseInt(wordCount.toString()),
		taylorSwiftIpsum: generateIpsum('ugh', wordCount, lingo.ts, true) //TODO: switch out albums according to a param
	}

	//WRITE TO CONSOLE
	var jsonString = JSON.stringify(taylorSwiftIpsumJson);
	console.log('the json ' + jsonString)


	//WRITE TO SCREEN
	function displayJson(){
		document.write(jsonString)
	}
	displayJson();

}(window))
