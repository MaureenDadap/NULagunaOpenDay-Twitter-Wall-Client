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

Handlebars.registerHelper("imagesIterator", function (image) {
    var images = image.split(';');
    images.pop(); //remove last element because it is always empty
    var imgElements = new Handlebars.SafeString('<div class="image-container ');
    
    var imgCount = images.length;
    var imgClass;
    if (imgCount == 1) {
        imgClass = 'img-1">';
    } else if (imgCount == 2) {
        imgClass = 'img-2">';
    } else if (imgCount == 3) {
        imgClass = 'img-3">';
    } else if (imgCount == 4) {
        imgClass = 'img-4">';
    }
    imgElements +=  new Handlebars.SafeString(imgClass);

    images.forEach(image => {
        var img = new Handlebars.SafeString('<div class="image"><img src="' + image + '"></div>');
        imgElements += img;
    });


    imgElements +=  new Handlebars.SafeString('</div>');

    if (imgElements == undefined)
        return null;
    else
        return imgElements;
});




// var popupTemplate = "<div class='pop-up card' id = 'popup' data-time='{{created_at}}'> " +
//     "{{#if image }}<div class='image-container'>" +
//     //"{{ imageCounter image }} " +
//     "{{{ imagesIterator image }}}" +
//     "</div>{{/if}}" +
//     "<div class='content'>" +
//     "<div class='meta'>" +
//     "<span class='date'>{{formatDate created_at}}</span>" +
//     "</div>" +
//     "<div class='description'>" +
//     "{{parseHashtags caption type}}" +
//     "</div>" +
//     "</div>" +
//     "<div class='author type-{{type}}'>" +
//     "<img src='{{user.avatar}}' class='ui avatar image'>" +
//     "{{linkUsername user.username type}}" +
//     "</div>" +
//     "</div>";

var popupTemplate = "<div class='ui card' id = 'popup' data-time='{{created_at}}'> " +
    "{{#if image }}" +
    "{{{ imagesIterator image }}}" +
    "{{/if}}" +
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