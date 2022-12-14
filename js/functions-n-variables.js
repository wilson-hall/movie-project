const edit = "<a href='#' class='edit text-white bg-success rounded-3 align-items-center'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n" +
    "  <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/>\n" +
    "</svg>Edit</a>";

const deleteBtn = "<a href='#' class='delete text-white bg-danger rounded-3 align-items-center'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3-fill\" viewBox=\"0 0 16 16\">\n" +
    "  <path d=\"M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z\"/>\n" +
    "</svg>Delete</a>";

const saveForm = () => {
    return `<form id="edit-movie" class="footer-form">
\t<label for="title"> Edit your movie
\t\t<input type="text" name="title" id="title">
\t\t</label>
\t<br>
<fieldset class="rating">
\t<input type="radio" id="1-star" name="star" class="star" value="5"
\t\t>
\t<label for="1-star">1</label>
\t<input type="radio" id="2-star" name="star" class="star" value="4"
\t\t>
\t<label for="2-star">2</label>
\t<input type="radio" id="3-star" name="star" class="star" value="3"
\t\t>
\t<label for="3-star">3</label>
\t<input type="radio" id="4-star" name="star" class="star" value="2"
\t\t>
\t<label for="4-star">4</label>
\t<input type="radio" id="5-star" name="star" class="star" value="1"
\t\t>
\t<label for="5-star">5</label>
</fieldset>
\t<button type='submit' id='save-button'>Save</button>
</form>`
};

// const submitForm = () => {
//     return `<form id="add-movie">
// \t<label for="title"> Enter the movie title
// \t\t<input type="text" name="title" id="title">
// \t\t</label>
// \t<br>
// \t<input type="radio" id="1-star" name="star" value="1"
// \t\t>
// \t<label for="1-star">1</label>
// \t<input type="radio" id="2-star" name="star" value="2"
// \t\t>
// \t<label for="2-star">2</label>
// \t<input type="radio" id="3-star" name="star" value="3"
// \t\t>
// \t<label for="3-star">3</label>
// \t<input type="radio" id="4-star" name="star" value="4"
// \t\t>
// \t<label for="4-star">4</label>
// \t<input type="radio" id="5-star" name="star" value="5"
// \t\t>
// \t<label for="5-star">5</label>
// \t<button type='submit' id='submit-button' className='hidden'>Submit</button>
// </form>`
// };
const submitForm = () => {
    return `<form id="add-movie" class="footer-form">
\t<label for="title"> Add a movie
\t\t<input type="text" placeholder="Enter Movie Title..." name="title" id="title">
\t\t</label>
\t<br>
<fieldset class="rating">
\t<input type="radio" id="1-star" name="star" class="star" value="5"
\t\t>
\t<label for="1-star">1</label>
\t<input type="radio" id="2-star" name="star" class="star" value="4"
\t\t>
\t<label for="2-star">2</label>
\t<input type="radio" id="3-star" name="star" class="star" value="3"
\t\t>
\t<label for="3-star">3</label>
\t<input type="radio" id="4-star" name="star" class="star" value="2"
\t\t>
\t<label for="4-star">4</label>
\t<input type="radio" id="5-star" name="star" class="star" value="1"
\t\t>
\t<label for="5-star">5</label>
</fieldset>
\t<button type='submit' id='submit-button'>Submit</button>
</form>`
};

const starImg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n' +
    '  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
    '</svg>'


// const saveForm = () => {
//     return "<form id=\"edit-movie\">\n" +
//         "\t<label for=\"title\"> Enter the movie title\n" +
//         "\t\t<input type=\"text\" name=\"title\" id=\"title\" value=\"\">\n" +
//         "\t</label>\n" +
//         "\t<br>\n" +
//         "\t<label for=\"rating\"> Enter your rating for this movie\n" +
//         "\t\t<input type=\"text\" name=\"rating\" id=\"rating\" value=\"\">\n" +
//         "\t</label><button type=\"submit\" id=\"save-button\" class=\"hidden\">Save</button></form>"
// };

// const submitForm = () => {
//     return "<form id=\"add-movie\">\n" +
//         "\t<label for=\"title\"> Enter the movie title\n" +
//         "\t\t<input type=\"text\" name=\"title\" id=\"title\">\n" +
//         "\t</label>\n" +
//         "\t<br>\n" +
//         "\t<label for=\"rating\"> Enter your rating for this movie\n" +
//         "\t\t<input type=\"text\" name=\"rating\" id=\"rating\">\n" +
//         "\t</label><button type='submit' id='submit-button' className='hidden'>Submit</button></form>"
// };