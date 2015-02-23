(function(){
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
})();