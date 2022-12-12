"use strict";

$(document).ready(() => {
    $('div#movies').html("Loading...")
});

const getMovies = () => {
    fetch("https://lizard-positive-cook.glitch.me/movies").then(resp => resp.json()).then(data => {
        $("#movie-form").html(submitForm)

        // variable declaration
        const titles = data.map(data => data.title)
        const ratings = data.map(data => data.rating)
        const id = data.map(data => data.id)
        console.log(id)
        // empties the container of whatever is currently inside it
        $("#movies").empty();

        // refills the container with every movie that has been passed to server
        for (let i = 0; i < data.length; i++) {
            $("#movies").append(`<p><span class="ref-title">${titles[i]}</span> <span class="ref-rating">${ratings[i]}</span> <span class="ref-id">${id[i]}</span> ${edit} ${deleteBtn}</p>`)
        }

        // edit button functionality
        $('.edit').click(function (e) {
            e.preventDefault();
            let refTitle = $(this).siblings('span.ref-title').html();
            let refRating = $(this).siblings('span.ref-rating').html();
            let refID = $(this).siblings('span.ref-id').html();


            console.log(refID)
            console.log(refTitle);
            console.log(refRating);
            $("#movie-form").html(saveForm)

            $('#title').val(refTitle);
            $('#rating').val(refRating);
            saveButtonFunctionality(refID);
        });

        $(".delete").click(function (e) {
            e = confirm("Are you sure you want to delete this movie?")
            let refID = $(this).siblings('span.ref-id').html();
            console.log(refID)
            if (e) {
                fetch(`https://lizard-positive-cook.glitch.me/movies/${refID}`, {
                    method: "DELETE"
                }).then(() => {
                    getMovies();
                });
            } else {
                getMovies();
            }
        })
    });
};

const saveButtonFunctionality = (refID) => {
    $("#edit-movie").submit(e => {
        e.preventDefault()
        const editedMovie = {
            title: $("#title").val(),
            rating: $("#rating").val()
        }

        fetch(`https://lizard-positive-cook.glitch.me/movies/${refID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedMovie)
        }).then(() => {
            $('#title').val('')
            $('#rating').val('')

            getMovies();
        });
    });
};

getMovies();

$("#add-movie").submit(e => {
    e.preventDefault()
    const newMovie = {
        title: $("#title").val(),
        rating: $("#rating").val()
    };
    fetch("https://lizard-positive-cook.glitch.me/movies", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    })
        .then(() => fetch("https://lizard-positive-cook.glitch.me/movies")
            .then(resp => resp.json())
            .then(data => {
                getMovies();
                console.log(newMovie)
                console.log(data)
            }))
});