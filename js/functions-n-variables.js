const edit = "<a href='#' class='edit'>Edit</a>";

const deleteBtn = "<a href='#' class='delete'>Delete</a>";

const saveForm = () => {
    return "<form id=\"edit-movie\">\n" +
        "\t<label for=\"title\"> Enter the movie title\n" +
        "\t\t<input type=\"text\" name=\"title\" id=\"title\" value=\"\">\n" +
        "\t</label>\n" +
        "\t<br>\n" +
        "\t<label for=\"rating\"> Enter your rating for this movie\n" +
        "\t\t<input type=\"text\" name=\"rating\" id=\"rating\" value=\"\">\n" +
        "\t</label><button type=\"submit\" id=\"save-button\" class=\"hidden\">Save</button></form>"
};

const submitForm = () => {
    return "<form id=\"add-movie\">\n" +
        "\t<label for=\"title\"> Enter the movie title\n" +
        "\t\t<input type=\"text\" name=\"title\" id=\"title\" value=\"\">\n" +
        "\t</label>\n" +
        "\t<br>\n" +
        "\t<label for=\"rating\"> Enter your rating for this movie\n" +
        "\t\t<input type=\"text\" name=\"rating\" id=\"rating\" value=\"\">\n" +
        "\t</label><button type='submit' id='submit-button' className='hidden'>Submit</button></form>"
};