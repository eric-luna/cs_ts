$(document).ready(function(){
  $('.search').keypress(function(e) {
    if (e.keyCode == 13)
      $('.button').click();
  });
  
  $('.button').on('click',function(){
  $('.poster').empty();
  var search=$('.search').val();
  var url ="http://api.themoviedb.org/3/search/movie?api_key=39124889ea92aada0703109651a543ab&query="+search;
  console.log(url);
  $.ajax(
    {
     url: url,
     type:'GET',
     jsonpCallback: 'testing',
     contentType: 'application/json',
     dataType: 'jsonp',
     success: function(result){
        var path = result.results[0];
        $('.poster').append("<img src='http://image.tmdb.org/t/p/w500/"+result.results[0]['poster_path']+"'>");
       console.log(result.results[0]['poster_path']);
     }})
  })
  
  
});