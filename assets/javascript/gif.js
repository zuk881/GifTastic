
// array to hold data values, button text, and search parameters
var giphy = ["silly cat", "happy cat", "grumpy cat", "tired cat"];

// function used to get data from giphy.com
function gifApi() {

  // call to remove previous gifs before adding new ones
  $("#pics").empty();

  // variable to hold the data of button pushed that is then added to search
  var catType = $(this).attr("data-name");

  // variable to hold the parameters of ajax call
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + catType + "&api_key=94tWcGFM6E7Wgp6J65im7ukVX5wN4Z3q&limit=10";

  // ajax call to get data from giphy.com
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (x) {

    displayGif(x.data);

  });
}

// function to display results from ajax call
function displayGif(results) {
  
  // for loop used to disply all results from ajax call  
  for (var i = 0; i < 10; i++) {

    // variables needed to hold values
    var gifDiv = $("<div>");
    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);
    var catImage = $("<img>");

    // adding attributes needed for still/animate function and adding images and ratings to gifDiv and then displaying them when called    
    catImage.attr("src", results[i].images.fixed_height.url);
    catImage.attr("data-still", results[i].images.fixed_height_still.url);
    catImage.attr("data-animate", results[i].images.fixed_height.url);
    catImage.addClass("gif")
    gifDiv.addClass("col-sm-2");
    gifDiv.append(p);
    gifDiv.prepend(catImage);
    $("#pics").append(gifDiv);
  }
}
// function to loop through the array and display buttons
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < giphy.length; i++) {
    var a = $("<button>");
    a.addClass("gif-button");
    a.attr("data-name", giphy[i]);
    a.text(giphy[i]);
    $("#buttons-view").append(a);
  }
}

// on-click function to get value out of submit form, push into the array, and display new button
$("#add-cat").on("click", function (event) {
  event.preventDefault();
  var giph = $("#gif-input").val().trim();
  giphy.push(giph);
  renderButtons();

});

// button event listener to display 10 gifs 
$(document).on("click", ".gif-button", gifApi);

// function call to display initial buttons  
renderButtons();

// click on gif listener to change data-state from active to still and reverse    
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

