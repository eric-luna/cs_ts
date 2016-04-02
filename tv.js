$(document).ready(function(){
 
  var count=0;
  var check="";

   $('.search').keypress(function(e) {
    if (e.keyCode == 13)
      $('.button').click();
     count=0;
  });

  $('.button').on('click',function(){ 
  $('.name, .poster, .overview,.first_air_date,.navigation').empty();
  var search=$('.search').val();
  check=$('.search').val();
  if(check !== search){
    count=0;
  }
  var url ="http://api.themoviedb.org/3/search/tv?api_key=39124889ea92aada0703109651a543ab&query="+search;
  $.ajax(
    {
     url: url,
     type:'GET',
     jsonpCallback: 'testing',
     contentType: 'application/json',
     dataType: 'jsonp',
     success: function(result){
        
        var name=result.results[count]['name'];
        var first_air_date=result.results[count]["first_air_date"];
        var poster = result.results[count]['poster_path'];
        var overview=result.results[count]['overview'];

        $('.name').append("<h1>"+name+"</h1>");
        if(first_air_date===""){
          $('.first_air_date').append("<p>First Air Date: N/A</p>");
        }else{
          $('.first_air_date').append("<p>First Air Date: "+first_air_date+"</p>");
        }
        
        if(poster === null ){
          $('.poster').append("<img src='img/noPoster.jpg'>");
        }
        if(poster !== null){
           $('.poster').append("<img src='http://image.tmdb.org/t/p/w500/"+poster+"'>");
        }
        if(overview ===""){
           $('.overview').append("<p>No Description Available</p>");
        }else if(overview.length > 500){
           $('.overview').append("<p>"+overview.slice(0,500)+"...</p>");
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
       console.log(result.results);
     }})
  })
});