import Handlebars from 'handlebars/dist/cjs/handlebars';

Handlebars.registerHelper("formatDate", function (date) {

    var itemDate = new Date(date);

    var string = itemDate.getDate() + "." + (itemDate.getMonth() + 1) + "." + itemDate.getFullYear() + " ";

    if (itemDate.getHours() < 10) string = string + "0" + itemDate.getHours(); else string = string + itemDate.getHours();

    string = string + ":";

    if (itemDate.getMinutes() < 10) string = string + "0" + itemDate.getMinutes(); else string = string + itemDate.getMinutes();

    return string;

});

Handlebars.registerHelper("parseHashtags", function (caption, type) {

    caption = caption.replace(/\S*#(\[[^\]]+\]|\S+)/ig, '<a href=\'#\'>#$1</a>');

    return new Handlebars.SafeString(caption);

});

Handlebars.registerHelper("linkUsername", function (username, type) {

    switch (type) {

        case 1:
            return new Handlebars.SafeString("<a href='http://instagram.com/" + username + "' target='_blank'>" + username + "</a>");
            break;

        case 2:
            return new Handlebars.SafeString("<a href='http://twitter.com/" + username + "' target='_blank'>" + username + "</a>");
            break;

    }

});

var popupTemplate = "<div class='pop-up card' id = 'popup' data-time='{{created_at}}'> " +
    "{{#if image }}<div class='image'>" +
    "<img src='{{image}}'>" +
    "</div>{{/if}}" +
    "<div class='content'>" +
    "<div class='meta'>" +
    "<span class='date'>{{formatDate created_at}}</span>" +
    "</div>" +
    "<div class='description'>" +
    "{{parseHashtags caption type}}" +
    "</div>" +
    "</div>" +
    "<div class='author type-{{type}}'>" +
    "<img src='{{user.avatar}}' class='ui avatar image'>" +
    "{{linkUsername user.username type}}" +
    "</div>" +
    "</div>";


popupTemplate = Handlebars.compile(popupTemplate);

export default popupTemplate

// $.getJSON(window.hashtagWallConfig.apiBaseUrl + "/posts", function (posts) {
//     post = posts[0];
// })

// var modal = document.querySelector(".modal");

// $(document).ready(function () {
//     setTimeout(toggleModalShow, 15000); //will wait for 15 seconds before initially showing a pop-up
// })

// function toggleModalShow() { //called after 15 seconds from line 73
//     $("#popup").remove();
//     $("#modal-content").append(cardTemplate(post));
//     modal.classList.toggle("show-modal"); //toggles the div to be shown
//     setTimeout(toggleModalHide, 3000); //counts 3 seconds before toggling it again to be hidden
// }

// function toggleModalHide() { //called after 3 seconds from line 80
//     modal.classList.toggle("show-modal"); //toggles the div to be hidden
//     setTimeout(toggleModalShow, 15000); //recounts 15 seconds again, fundamentally restarting the sequence that started in line 73
// }