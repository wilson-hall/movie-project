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
        console.log(data)

        // empties the container of whatever is currently inside it
        $("#movies").empty();

        // TODO
        moviePosters(`${titles[i]}`)

        // refills the container with every movie that has been passed to server
        for (let i = 0; i < data.length; i++) {
            $("#movies").append(`<p class="card m-2 col-3 text-center"><span class="ref-title">${titles[i]}</span> <span class="ref-rating">${ratings[i]}</span> <span class="ref-id">${id[i]}</span> ${edit} ${deleteBtn}</p>`)
        }

        // edit button functionality
        $('.edit').click(function (e) {
            e.preventDefault();
            let refTitle = $(this).siblings('span.ref-title').html();
            let refRating = $(this).siblings('span.ref-rating').html();
            let refID = $(this).siblings('span.ref-id').html();
            $("#movie-form").html(saveForm)

            $('#title').val(refTitle);
            $('#rating').val(refRating);
            saveButtonFunctionality(refID);
        });

        $(".delete").click(function (e) {
            e = confirm("Are you sure you want to delete this movie?")
            let refID = $(this).siblings('span.ref-id').html();
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
        addMovieFunctionality();
    });
};

const moviePosters = (refTitle) => {
    fetch(`https://www.omdbapi.com/?t=${refTitle}&apikey=${omdbKey}`).then(resp => resp.json()).then((data) => {
        console.log(data)
        $(".card").prepend(`<img src=${data.poster}>`)
    })
}

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

const addMovieFunctionality = () => {
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
                }))
    });
}