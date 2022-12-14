"use strict";
(() => {

    $(document).ready(() => {
        $('div#movies').html(`<div class="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`)
    });

    const getMovies = () => {
        fetch("https://billowy-unmarred-coreopsis.glitch.me/movies")
            .then(resp => resp.json())
            .then(data => {
                $("#movie-form").html(submitForm)

                // variable declaration
                const titles = data.map(data => data.title)
                const ratings = data.map(data => data.rating)
                const id = data.map(data => data.id)
                const posters = data.map(data => data.poster)

                // empties the container of whatever is currently inside it
                $("#movies").empty();

                // refills the container with every movie that has been passed to server
                for (let i = 0; i < data.length; i++) {
                    $("#movies").append(`<div class="card col-4 col-lg-3 col-xl-2 p-0 text-center justify-content-between"><img src="${posters[i]}"><span class="ref-title">${titles[i]}</span> <span class="show-rating">${turnRatingIntoStars(ratings[i])}</span> <input type="hidden" class="ref-rating" value="${ratings[i]}"><span class="ref-id">${id[i]}</span> <div>${edit} ${deleteBtn}</div></div>`)
                }

                // edit button functionality
                $('.edit').click(function (e) {
                    e.preventDefault();
                    let refTitle = $(this).parent().siblings('span.ref-title').html();
                    let refRating = $(this).parent().siblings('input.ref-rating').val();
                    let refID = $(this).parent().siblings('span.ref-id').html();
                    let stars = document.getElementsByClassName('star');
                    $("#movie-form").html(saveForm)

                    $('#title').val(refTitle);
                    for (let i = 0; i < stars.length; i++) {
                        if (stars[i].value === refRating) {
                            $('input[name="star"]').eq(i).prop('checked', true);
                            break;
                        }
                    }
                    document.querySelector('input[name="star"]').value;
                    saveButtonFunctionality(refID);
                });

                $(".delete").click(function (e) {
                    e.preventDefault();
                    e = confirm("Are you sure you want to delete this movie?")
                    let refID = $(this).parent().siblings('span.ref-id').html();
                    if (e) {
                        $(this).parent().parent().slideUp();
                        fetch(`https://billowy-unmarred-coreopsis.glitch.me/movies/${refID}`, {
                            method: "DELETE"
                        }).then(() => {
                            getMovies();
                        });
                    } else {
                        getMovies();
                    }
                })
                addMovieFunctionality();
                turnRatingIntoStars();
            });
    };

    const moviePosters = (title) => {
        return fetch(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`)
            .then(resp => resp.json())
            .then((poster) => {
                if (poster.Response === "False") {
                    poster.Poster = 'img/default.jpeg'
                }
                return poster.Poster
            });
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

                fetch(`https://billowy-unmarred-coreopsis.glitch.me/movies/${refID}`, {
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
                fetch("https://billowy-unmarred-coreopsis.glitch.me/movies", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMovie),
                })
                    .then(() => fetch("https://billowy-unmarred-coreopsis.glitch.me/movies")
                        .then(resp => resp.json())
                        .then(data => {
                            getMovies();
                        }))
            });
        });
    }

    const turnRatingIntoStars = (num) => {
        let htmlStr = ''
        for (num; num > 0; num--) {
            htmlStr += starImg
        }
        return htmlStr
    }
})();