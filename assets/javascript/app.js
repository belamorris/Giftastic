$(document).ready(function(){
// listing my array of topics 
	var topics = ['Stratocaster', 'Telecaster', 'Les Paul', 'Jazzmaster'];
// function to turn topics into buttons
function displaybuttons(){
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("topics");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#topicButtons").append(gifButton);
	}


$("#topicButtons").on("click", function(){
	var guitar = $(this).data("name");
	var apiKey = "WSY305l72MwB3JpnUG74hV5Fp85piPgx";
	var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + guitar + "&limit=10&api_key=" + apiKey;
	console.log(this);
	//ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		//Log response
		console.log(response);
	})
	$("#gifs").empty();

	var data = response.data;
	console.log(response.data)
	
	//For loop through data
	for (var i = 0; i < data.length; i++) {
		// Create div for gifs
		var gifDiv = $("<div>");
		gifDiv.addClass("gifDiv");

}
})
}
	



displaybuttons();
});