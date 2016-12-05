$(document).ready(function(){
 
  var count=0;
  var check="";
  // when enter key is pressed initiates the search fucntion 
   $('.search').keypress(function(e) {
    if (e.keyCode == 13)
      $('.button').click();
     count=0;
  });
  // main function executed on button click
  $('.button').on('click',function(){ 
  // empties the tv info section for new results
  $('.title, .poster, .overview,.first_air_date,.navigation,.trailer').empty();
  // saves the search bar value to send with the api request
  var search=$('.search').val();
  check=$('.search').val();
  if(check !== search){
    count=0;
  }
  // url for api request
  var url ="http://api.themoviedb.org/3/search/tv?api_key=39124889ea92aada0703109651a543ab&query="+search;
  $.ajax(
    {
     url: url,
     type:'GET',
     jsonpCallback: 'testing',
     contentType: 'application/json',
     dataType: 'jsonp',
     success: function(result){
        var id = result.results[count]["id"];
        var url2 = "http://api.themoviedb.org/3/tv/" + id + "/videos?api_key=39124889ea92aada0703109651a543ab";
        // second ajax request for additional movie info whcih needs the id from the first aja request
        $.ajax({
          url: url2,
          type: 'GET',
          jsonpCallback: 'testing',
          contentType: 'application/json',
          dataType: 'jsonp',
          success: function(result) {
            console.log(result);
            var key = "";
            for(var i=0;i<result.results.length;i++){
              if(result.results[i]["type"]==="Trailer"){
                key=result.results[i]["key"];
              }
            }
            console.log(key);
            if(key!==""){
              var trailer = "https://www.youtube.com/watch?v=" + key;
              $(".trailer").append("<a href='" + trailer + "' target='_blank'><p class='trailer-button'>Click For Trailer</p></a>");
            }
            
            console.log(trailer);
            
            console.log(key);
          }
        })
        // tv show results information
        var title=result.results[count]['name'];
        var first_air_date=result.results[count]["first_air_date"];
        var poster = result.results[count]['poster_path'];
        var overview=result.results[count]['overview'];
        // adds title to name section
        $('.title').append("<h1>"+title+"</h1>");
        // checks to see if first air date info is available
        if(first_air_date===""){
          $('.first_air_date').append("<p>First Air Date: N/A</p>");
        }else{
          $('.first_air_date').append("<p>First Air Date: "+first_air_date+"</p>");
        }
        // checks to see if poster image is available
        if(poster === null ){
          $('.poster').append("<img src='img/noPoster.jpg'>");
        }
        if(poster !== null){
           $('.poster').append("<img src='http://image.tmdb.org/t/p/w500/"+poster+"'>");
        }
        // checks to see if tv show summary is available and adds it to tv section
        if(overview ===""){
           $('.overview').append("<p>No Description Available</p>");
        //if summmary is too long the length is shortened to 500 
        }else if(overview.length > 500){
           $('.overview').append("<p>"+overview.slice(0,500)+"...</p>");
        }else{
           $('.overview').append("<p>"+overview+"</p>");
        }
        // adds buttons to navigation section depending on tv show result and count
        if(count > 0){
          $('.navigation').append("<button class='left action-button animate'>Prev</button>");
          $('.navigation').append("<button class='right action-button animate'>Next</button>");
        }
        if(count===0){
           $('.navigation').append("<button class='right action-button animate blue'>Next</button>");
        }
        // adds next button fucntion
        $('.right').on('click',function(){
          if(count < result.results.length){
            count=count+1;
            $('button').click();
          }
          // resets count if on last tv show of results
          if(!(count < result.results.length)){
            count=0;
            $('button').click();
          }
        });
        // adds left button function 
       $('.left').on('click',function(){
          if(count > 0){
            count=count-1;
            $('button').click();
          }
        });
       // lets the user use left and right arrow keys 
       $(document).keydown(function(e) {
        if (e.keyCode == 37)
        $('.left').click();
       });
       $(document).keydown(function(e) {
        if (e.keyCode == 39)
        $('.right').click();
      });
      $('.tv-info').css('display','block'); 
     }})
  })
});