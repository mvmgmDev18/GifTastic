// // alert("test");
$(document).ready(function () {

    var topics = ["Acura NSX", "BMW M3", "Corvette", "Drift", "Formula 1", "Skyline GTR", "Lancer Evolution", "WRX STI", "WRC", "Porsche RWB"];

    //For loop function for topics array
    function renderButtons() {

        $('#buttons-view').empty();
        for (var i = 0; i < topics.length; i++) {

            //Buttons for from array
            var a = $('<button>');
            a.addClass('fast-car');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);

            $('#buttons-view').append(a);
        }
    } renderButtons();
    $(document).on('click', '.fast-car', function () {

        //value of sportsCar on button
        var sportsCar = $(this).html();
        console.log(sportsCar);

        //API with key, limit of 10, and rating of G.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportsCar + "&api_key=NT48m4Vbdp0xJS0bh8cJv7zdIA0X4y8X&limit=10&rating=G";
        console.log(queryURL);

        // AJAX Function to API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            console.log(results);

            //jQuery to empty div.
            $('#cars-view').empty();

            //For loop for images retrieved
            for (var j = 0; j < results.length; j++) {
                var imageDiv = $('<div>');
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                console.log(imageView);


                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                $('#cars-view').append(gifImage);
                gifImage.on('click', playGif);

                //Pull .gif ratings
                var rating = results[j].rating;
                console.log(rating);

                var displayRated = $('<p>').text("Rating: " + rating);

                $('#cars-view').append(displayRated);

            }
        });   

        //Function for still and animate .gis retrieved.
        function playGif() {
            var state = $(this).attr('data-state');
            console.log(state);

            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }
            else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        } 
    });

    //jQuery for adding button to existing printed array
    $(document).on('click', '#add-car', function () {
        if ($('#car-input').val().trim() == '') {
            alert('Input your Favorite Sports Car');
        }
        else {
            var petrol = $('#car-input').val().trim();
            topics.push(petrol);
            $('#car-input').val('');
            renderButtons();
            return false;
        }
    });
});














