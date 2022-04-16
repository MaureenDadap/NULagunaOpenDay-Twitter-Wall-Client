import jQuery from 'jquery';
window.$ = jQuery;

import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import './sass/style.scss';

import cardTemplate from './handlebars-init';

var iso = {};

$(document).ready(function () {  
 
  $("#title-hashtag").text(window.hashtagWallConfig.hashtag);

  $.getJSON(window.hashtagWallConfig.apiBaseUrl + "/posts", function (posts) {

    posts.forEach(function (item) {

      var itemDate = new Date(item.time);

      $("#card-container").append(cardTemplate(item));
      //$("#card-container").prepend(cardTemplate(item));

    });

    imagesLoaded("#card-container", function () {

      iso = new Isotope("#card-container", {
        itemSelector: ".card",
        transitionDuration: 100,
        sortAscending: true,
        originLeft: false,
        originTop: false,
        masonry: {
          columnWidth: '.card',
          gutter: parseInt($('.card:first-of-type').css('marginBottom').substr(0, 2)),
          fitWidth: true
        }
      });

    });
    
  });
  setInterval(updateFeed, window.hashtagWallConfig.updateInterval);
});

function spotlightPost() {

}

function updateFeed() {
  var timestamp = new Date($("#card-container .card:first-of-type").data('time'));

  timestamp = timestamp.getTime();

  $.getJSON(window.hashtagWallConfig.apiBaseUrl + "/posts/" + timestamp, function (posts) {

    if (posts.length > 0) {

      var elements = [];

      posts.forEach(function (post) {

        var elem = $(cardTemplate(post)).get(0);

        elements.push(elem);
        //elements.unshift(elem);

      });

      $("#card-container").prepend(elements);
      //$("#card-container").append(elements);

      imagesLoaded("#card-container", function () {
        var Y=window.scrollY;
        iso.prepended(elements);
        window.scrollTo(0,Y);
        //iso.appended(elements);

      });

    }

  });
}

function scrollToBottom() {
 
  document.getElementById('bottom').scrollIntoView()
  //window.scrollTo(0, document.body.scrollHeight);
}
