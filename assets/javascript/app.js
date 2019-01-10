$(document).ready(function () {
	// listing my array of topics 
	var topics = [
		"Rock",
		"Rap",
		"Metal",
		"Punk",
		"Pop",
		"Hip hop",
		"Blues",
		"Classical",
		"Electronic",
		"Alternative",
		"Classic Rock",
		"David Bowie"
	];
	// audio for when button is clicked
	audioClick = new Audio('assets/images/Clearing Throat Male-SoundBible.com-37691700.mp3');
	// function to turn topics into buttons
	function displaybuttons() {
		//empty my buttons div
		$('#topicButtons').empty();
		//create buttons based on topics list
		for (var i = 0; i < topics.length; i++) {
			var guitarBtn = $('<button>').text(topics[i]).addClass('btn btn-primary').addClass('guitarBtn').attr({
				'data-name': topics[i]
			});
			$('#topicButtons').append(guitarBtn);
		}
		//function for when button is clicked
		$(".guitarBtn").on("click", function () {
			$("#gifs").empty();
			audioClick.play();
			var guitar = $(this).data("name");
			var apiKey = "WSY305l72MwB3JpnUG74hV5Fp85piPgx";
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + guitar + "&limit=10&api_key=" + apiKey;
			console.log(this);
			//ajax call
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function (response) {
				var data = response.data;
				//For loop through data
				for (var i = 0; i < data.length; i++) {
					// Create div for gifs
					var gifDiv = $("<div>");
					gifDiv.addClass("gifDiv");
					//create var for rating
					var rating = $("<p>");
					rating.text(data[i].rating);
					//create var fo gifs
					var gif = $("<img>").addClass("gif");
					gif.attr("src", data[i].images.fixed_height_still.url);
					gif.attr("data-gifImg", "still");
					gif.attr("data-still", data[i].images.fixed_height_still.url);
					gif.attr("data-animate", data[i].images.fixed_height.url);
					// create an on click to change the state of the gif
					gif.on("click", function () {
						var state = $(this).attr("data-state");
						if (state === "still") {
							$(this).attr("src", $(this).attr("data-animate"));
							$(this).attr("data-state", "animate");
						} else {
							$(this).attr("src", $(this).attr("data-still"));
							$(this).attr("data-state", "still");
						}
					})
					rating.appendTo(gifDiv);
					gif.appendTo(gifDiv);
					$("#gifs").append(gifDiv);
				}
			})
		})
	}

	//function to add new gif button
	$('#add').on('click', function () {
		var newGuitar = $('#topic-input').val().trim();
		$('topicButtons').append(newGuitar);
		topics.push(newGuitar);
		displaybuttons();
		return false;
		console.log(topics);
	});

	displaybuttons();
});