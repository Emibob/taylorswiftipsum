import _ from 'underscore';
import $ from 'jquery';

(function(){
$.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=taylor+swift&limit=100&api_key=12PnkylgHYUVgs',
    dataType: 'json',
    success: function(result){
    	var allGifs = [];
    	var restricted = [];
    	var restrictedIds = ['cIGd1ypgKQANi', '10vTFkY3S0ImRO'];//TODO: refactor

    	_.each(result.data, function(gifInfo){
    		if((gifInfo.id === '10vTFkY3S0ImRO') || (gifInfo.id === 'cIGd1ypgKQANi')){
    			restricted.push(gifInfo);
    		}
    		else{
    			allGifs.push(gifInfo);
    		}
    	});

    	window.allGifs = allGifs;
    }
  });
})();