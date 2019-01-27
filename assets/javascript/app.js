// create an array of countries 
var countries = ["USA", "Mexico", "Canada", "Russia", "Japan", "Germany", "Saudi Arabia", "Nigeria", "Spain", "Portugal", "Israel", "Iraq", "China", "India", "Phillipines"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the countries prior to adding new countries so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the countries array
	for (var i = 0; i < countries.length; i++){
		// makes buttons for every country in the array
		var a = $('<button>') 
		a.addClass('country'); 
		a.attr('data-name', countries[i]); 
		a.text(countries[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addCountry button event
$("#addCountry").on("click", function(){

	// grabs the user country input
	var country = $("#country-input").val().trim();
	// that input is now added to the array
	countries.push(country);
	// the makeButtons function is called, which makes buttons for all my countries plus the user country
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var country = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&limit=9&api_key=neO4EDG3ZtanMhr9Ue4j4i12zuIbyb9D";

		// creates ajax call
		$.ajax({
            url: queryURL, 
            method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var countryGif = $('<img>');
					countryGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					countryGif.attr('title', "Rating: " + results[i].rating);
					countryGif.attr('data-still', results[i].images.fixed_height_still.url);
					countryGif.attr('data-state', 'still');
					countryGif.addClass('gif');
					countryGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(countryGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".country", displayGifs);

// initially calls the makeButtons function
makeButtons();