

var giphy = ["silly cat", "happy cat", "scared cat", "tired cat"];


function displayGif() {
  $("#gifs-appear-here").empty();
  var catType = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + catType + "&api_key=94tWcGFM6E7Wgp6J65im7ukVX5wN4Z3q&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response)
    for (var i = 0; i < 10; i++) {
      var gifDiv = $("<div>");
      var results = response.data;
      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var catImage = $("<img>");
      catImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(catImage);

      $("#gifs-appear-here").prepend(gifDiv);
console.log(catType);
    }
  });
}

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

$("#add-cat").on("click", function (event) {
  event.preventDefault();
  var giph = $("#gif-input").val().trim();
  giphy.push(giph);
  renderButtons();
});
$(document).on("click", ".gif-button", displayGif);
renderButtons();