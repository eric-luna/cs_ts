$(document).ready(function(){
 
  var count=0;
  
   $('.search').keypress(function(e) {
    if (e.keyCode == 13)
      $('.button').click();
     count=0;
  });

  $('.button').on('click',function(){
  $('.title, .poster, .overview,.navigation').empty();
  var search=$('.search').val();
  var url ="http://api.themoviedb.org/3/search/movie?api_key=39124889ea92aada0703109651a543ab&query="+search;
  $.ajax(
    {
     url: url,
     type:'GET',
     jsonpCallback: 'testing',
     contentType: 'application/json',
     dataType: 'jsonp',
     success: function(result){
        
        var title=result.results[count]['title'];
        var poster = result.results[count]['poster_path'];
        var overview=result.results[count]['overview'];

        $('.title').append("<h1>"+title+"</h1>");
        if(poster === null ){
          $('.poster').append("<img src='img/noPoster.jpg'>");
        }
        if(poster !== null){
           $('.poster').append("<img src='http://image.tmdb.org/t/p/w500/"+poster+"'>");
        }
        if(overview ===""){
           $('.overview').append("<p>No Description Available</p>");
        }else{
           $('.overview').append("<p>"+overview+"</p>");
        }
       
        if(count > 0){
          $('.navigation').append("<button class='left action-button animate blue'>Prev</button>");
          $('.navigation').append("<button class='right action-button animate blue'>Next</button>");
        }
        if(count===0){
           $('.navigation').append("<button class='right action-button animate blue'>Next</button>");
        }
        $('.right').on('click',function(){
          if(count < result.results.length){
            count=count+1;
            $('button').click();
          }
          if(!(count < result.results.length)){
            count=0;
            $('button').click();
          }
        });
       $('.left').on('click',function(){
          if(count > 0){
            count=count-1;
            $('button').click();
          }
        });
       $(document).keydown(function(e) {
        if (e.keyCode == 37)
        $('.left').click();
       });
       $(document).keydown(function(e) {
        if (e.keyCode == 39)
        $('.right').click();
      }); 
       console.log(result.results.length);
     }})
  })
});