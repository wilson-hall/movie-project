"use strict";


// READ - GET
// On page load:
//
//Display a "loading..." message
// Make an AJAX request to get a listing of all the movies
// When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the json response your code receives

const edit = "<a href='#'>Edit</a>"

$(document).ready(() => {
    $('div#movies').html("Loading...")
})
fetch("https://lizard-positive-cook.glitch.me/movies").then(resp => resp.json()).then(data => {
    // variable declaration
    const titles = data.map(data => data.title)
    const ratings = data.map(data => data.rating)
    const id = data.map(data => data.id)
    console.log(id)

    // empties the container of whatever is currently inside it
    $("#movies").empty();

    // refills the container with every movie that has been passed to server
    for (let i = 0; i < data.length; i++) {
        $("#movies").append(`<p><span class="ref-title">${titles[i]}</span> <span class="ref-rating">${ratings[i]}</span> ${edit}</p>`)
    }

    // edit button functionality
    $('a').click(function (e) {
        e.preventDefault();
        let refTitle = $(this).siblings('span.ref-title').html();
        let refRating = $(this).siblings('span.ref-rating').html();
        // TODO: get index of title to associate with id
        // const index =
        console.log(data[5].id)

        console.log(refTitle);
        console.log(refRating);

        $('#title').val(refTitle);
        $('#rating').val(refRating);

        $('button').toggleClass('hidden')

        $('#submit-button').attr('id', 'save-button');
        $('#add-movie').attr('id', 'edit-movie');
    })

    console.log(titles)
    console.log(ratings)
    console.log(data)
}).then(() => {
$("#save-button").click(e => {
    e.preventDefault()
    const editedMovie = {
        title: $("#title").val(),
        rating: $("#rating").val()
    }

    fetch(`https://lizard-positive-cook.glitch.me/movies/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMovie)
    }).then(() => fetch("https://lizard-positive-cook.glitch.me/movies")).then(resp => resp.json()).then(data => {
        const editedTitles = data.map(data => data.title)
        const editedRatings = data.map(data => data.rating)
        $("#movies").empty();
        for (let i = 0; i < data.length; i++) {
            $("#movies").append(`<p><span class="ref-title">${editedTitles[i]}</span> <span class="ref-rating">${editedRatings[i]}</span>${edit}</p>`);
        }
    });
})
})

// save button functionality
$('#save-button').click(() => {
    $('button').toggleClass('hidden')
    $('#save-button').attr('id', 'submit-button');
    $('#edit-movie').attr('id', 'add-movie');
})

//CREATE - POST
// Allow users to add new movies
//
// Create a form for adding a new movie that has fields for the movie's title and rating
// When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form

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
                const newTitles = data.map(data => data.title)
                const newRatings = data.map(data => data.rating)
                $("#movies").empty();
                for (let i = 0; i < data.length; i++) {
                    $("#movies").append(`<p><span class="ref-title">${newTitles[i]}</span> <span class="ref-rating">${newRatings[i]}</span> ${edit}</p> `)
                }
                console.log(newMovie)
                console.log(data)
            }))
})


//UPDATE - PUT/PATCH
// Allow users to edit existing movies
//
// Give users the option to edit an existing movie
// A form should be pre-populated with the selected movie's details
// Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.

// $("#edit-movie").submit(e => {
//     e.preventDefault()
//     const editedMovie = {
//         title: $("#title").val(),
//         rating: $("#rating").val()
//     };
//     fetch(`https://lizard-positive-cook.glitch.me/movies/1`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedMovie),
//     })
//         .then(() => fetch("https://lizard-positive-cook.glitch.me/movies")
//             .then(resp => resp.json())
//             .then(data => {
//                 const editedTitles = data.map(data => data.title)
//                 const editedRatings = data.map(data => data.rating)
//                 $("#movies").empty();
//                 for (let i = 0; i < data.length; i++) {
//                     $("#movies").append(`<p><span class="ref-title">${editedTitles[i]}</span> <span class="ref-rating">${editedRatings[i]}</span>`);
//                 }
//                 console.log(editedMovie)
//                 console.log(data)
//             }))
// })

// $("#save-button").click(e => {
//     e.preventDefault()
//     const editedMovie = {
//         title: $("#title").val(),
//         rating: $("#rating").val()
//     }
//     fetch("https://lizard-positive-cook.glitch.me/movies/10", {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editedMovie)
//     }).then(() => fetch("https://lizard-positive-cook.glitch.me/movies")).then(resp => resp.json()).then(data => {
//         const editedTitles = data.map(data => data.title)
//         const editedRatings = data.map(data => data.rating)
//         $("#movies").empty();
//         for (let i = 0; i < data.length; i++) {
//             $("#movies").append(`<p><span class="ref-title">${editedTitles[i]}</span> <span class="ref-rating">${editedRatings[i]}</span>${edit}</p>`);
//         }
//     });
// })

//DELETE
// Delete movies
//
// Each movie should have a "delete" button
// When this button is clicked, your javascript should send a DELETE request
