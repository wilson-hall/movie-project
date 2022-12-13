"use strict";

$(document).ready(() => {
    $('div#movies').html("Loading...")
});

const getMovies = () => {
    fetch("https://lizard-positive-cook.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => {
            $("#movie-form").html(submitForm)

            // variable declaration
            const titles = data.map(data => data.title)
            const ratings = data.map(data => data.rating)
            const id = data.map(data => data.id)
            const posters = data.map(data => data.poster)
            console.log(data)

            // empties the container of whatever is currently inside it
            $("#movies").empty();

            // refills the container with every movie that has been passed to server
            for (let i = 0; i < data.length; i++) {
                $("#movies").append(`<p class="card col-4 p-0 text-center"><img src="${posters[i]}"><span class="ref-title">${titles[i]}</span> <span class="ref-rating">${ratings[i]}</span> <span class="ref-id">${id[i]}</span> ${edit} ${deleteBtn}</p>`)
            }

            // edit button functionality
            $('.edit').click(function (e) {
                e.preventDefault();
                let refTitle = $(this).siblings('span.ref-title').html();
                let refRating = $(this).siblings('span.ref-rating').html();
                let refID = $(this).siblings('span.ref-id').html();
                let stars = document.getElementsByClassName('star');
                $("#movie-form").html(saveForm)
                // console.log(refRating)
                // console.log(stars[0].value)

                $('#title').val(refTitle);
                // $('#rating').val(refRating);
                for (let i = 0; i < stars.length; i++) {
                    if (stars[i].value === refRating) {
                        console.log(stars[i].value)
                        console.log(refRating)
                        $('input[name="star"]').eq(i).prop('checked', true);
                        break;
                    }
                }
                document.querySelector('input[name="star"]').value;
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

const moviePosters = (title) => {
        return fetch(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`)
            .then(resp => resp.json())
            .then((poster) => {
                console.log(poster)
                return poster.Poster
        })
}

const saveButtonFunctionality = (refID) => {
    $("#edit-movie").submit(e => {
        e.preventDefault()
        moviePosters($("#title").val()).then((poster) => {
        const editedMovie = {
            title: $("#title").val(),
            rating: document.querySelector('input[name="star"]:checked').value,
            poster
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
    });
};

getMovies();

const addMovieFunctionality = () => {
    $("#add-movie").submit(e => {
        e.preventDefault()
        moviePosters($("#title").val()).then((poster) => {
        const newMovie = {
            title: $("#title").val(),
            rating: document.querySelector('input[name="star"]:checked').value,
            poster
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
    });
}