$(document).ready(function() {
  // checks to see if a new search term is entered
  var count = 0;
  var check = "";
  // lets the search bar be entere with the enter button
  $('.search').keypress(function(e) {
    if (e.keyCode == 13)
      $('.button').click();
    count = 0;
  });
  // when the button is pressed the main function of the site will be executed
  $('.button').on('click', function() {
    // emptyies the mina movie divs from last search to makee room for new
    $('.title, .poster, .overview,.release_date,.navigation,.trailer').empty();
    // gets the value from search input bar
    var search = $('.search').val();
    // checks to see if the search value is a new one
    check = $('.search').val();
    // if user entered a new term the first result will be shown
    if (check !== search) {
      count = 0;
    }
    // get the search term and adds it to the api url to get movie info
    var url = "http://api.themoviedb.org/3/search/movie?api_key=39124889ea92aada0703109651a543ab&query=" + search;
    // main ajax function that pulls info from TMDB
    $.ajax({
      url: url,
      type: 'GET',
      jsonpCallback: 'testing',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(result) {
        var id = result.results[count]["id"];
        var url2 = "http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=39124889ea92aada0703109651a543ab";
        // second ajax request for additional movie info whcih needs the id from the first aja request
        $.ajax({
          url: url2,
          type: 'GET',
          jsonpCallback: 'testing',
          contentType: 'application/json',
          dataType: 'jsonp',
          success: function(result) {
            var key = result.results[0]["key"];
            var trailer = "https://www.youtube.com/watch?v=" + key;
            $(".trailer").append("<a href='" + trailer + "' target='_blank'><p class='trailer-button'>Click For Trailer</p></a>");
            console.log(key);
          }
        })
        // gest title of movie
        var title = result.results[count]['title'];
        // gets release date of movie
        var release_date = result.results[count]["release_date"];
        // gets the poster for the movie
        var poster = result.results[count]['poster_path'];
        // gets the overview summary for the movie
        var overview = result.results[count]['overview'];
        // adds movie title to the page
        $('.title').append("<h1>" + title + "</h1>");
        if (release_date === "") {
          $('.release_date').append("<p>Release Date: N/A</p>");
        } else {
          $('.release_date').append("<p>Release Date: " + release_date + "</p>");
        }
        // if poster is unavailable set it to default image
        if (poster === null) {
          $('.poster').append("<img src='img/noPoster.jpg'>");
        }
        // set poster to poster form api
        if (poster !== null) {
          $('.poster').append("<img src='http://image.tmdb.org/t/p/w500/" + poster + "'>");
        }
        // if overview is not available then let the user know
        if (overview === "") {
          $('.overview').append("<p>No Description Available</p>");

        }
        // if overview is over 500 characters cut it short 
        else if (overview.length > 500) {
          $('.overview').append("<p>" + overview.slice(0, 500) + "...</p>");
        }
         // add summary to page
        else {
          $('.overview').append("<p>" + overview + "</p>");
        }
        // adds button to go to previous movie is there is one
        if (count > 0) {
          $('.navigation').append("<button class='left action-button animate'>Prev</button>");
          $('.navigation').append("<button class='right action-button animate '>Next</button>");
        }
        // adds button for next movie if there is one
        if (count === 0) {
          $('.navigation').append("<button class='right action-button animate blue'>Next</button>");
        }
        // adds the main function to the next button
        $('.right').on('click', function() {
          if (count < result.results.length) {
            count = count + 1;
            $('button').click();
          }
          // restarts the movie list if on the last movie of list
          if (!(count < result.results.length)) {
            count = 0;
            $('button').click();
          }
        });
        // adds the main function for the previous button
        $('.left').on('click', function() {
          if (count > 0) {
            count = count - 1;
            $('button').click();
          }
        });
        // adds the next button function to the left arrow key
        $(document).keydown(function(e) {
          if (e.keyCode == 37)
            $('.left').click();
        });
        // adds the next button function to the right arrow key
        $(document).keydown(function(e) {
          if (e.keyCode == 39)
            $('.right').click();
        });

      }
    })
  })
});