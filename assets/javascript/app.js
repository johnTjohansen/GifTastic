
  var topics = ["Bugs Bunny", "Porky Pig", "Daffy Duck", "Elmer Fudd",
     "Tweety", "Dick Dastardly", "Muttley", "Penelope Pitstop", "Scooby Doo",
     "Witch Hazel", "Granny", "Bullwinkle", "Pepe LePeuw", "Wilma Flintstone"]

  renderButtons();

  $("button").on("click", function() {
    console.log("button clicked");
      // Grabbing and storing the data-toon property value from the button
    var toonChar = $(this).attr("data-toon");
      // Constructing a queryURL using the cartoon character name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        toonChar + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
      .done(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
        // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
            var gifDiv = $("<div class='gif'>");
          // Storing the result item's rating
            var rating = results[i].rating;
          // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
          // Creating an image tag
            var toonImage = $("<img>");
          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
            toonImage.attr("src", results[i].images.fixed_height_still.url);
            toonImage.attr("data-still", results[i].images.fixed_height_still.url);
            toonImage.attr("data-animate", results[i].images.fixed_height.url);
            toonImage.attr("data-state", "still");
          // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(toonImage);
            gifDiv.append(p);

            $("#gifs-are-here").prepend(gifDiv);
          }
        }  
      });     
    });

    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log("gif clicked state=" + state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      };
    });

    function renderButtons() {

        // Deleting the toons prior to adding new toons
        // (this is necessary otherwise you will have repeat buttons)
      $("#buttons").empty();

        // Looping through the array of toons
      for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each toon in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
          // Adding a class of toonChar to our button
        a.addClass("toonChar");
          // Adding a data-attribute
        a.attr("data-toon", topics[i]);
          // Providing the initial button text
        a.text(topics[i]);
          // Adding the button to the buttons-view div
        $("#buttons").append(a);
      }
    };

    $("#toonAdder").on("click", function() {
      console.log("Submit pressed");
      // routine for adding a new toon button.  Invoked by Submit button
      topics.push(#addToon.val());
      renderButtons();
    });  