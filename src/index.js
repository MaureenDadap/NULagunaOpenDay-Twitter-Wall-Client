import jQuery from 'jquery';
window.$ = jQuery;

import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import './sass/style.scss';

import cardTemplate from './handlebars-init';
import popupTemplate from './handlebars-popup';

var iso = {};
var spotlight = [];

$(document).ready(function () {

  $("#title-hashtag").text(window.hashtagWallConfig.hashtag);

  $.getJSON(window.hashtagWallConfig.apiBaseUrl + "/posts", function (posts) {

    posts.forEach(function (item) {

      var itemDate = new Date(item.time);

      $("#card-container").append(cardTemplate(item));

    });

    imagesLoaded("#card-container", function () {

      iso = new Isotope("#card-container", {
        itemSelector: ".card",
        transitionDuration: 0,
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
  setInterval(spotlightPost, window.hashtagWallConfig.updateInterval);
});

function spotlightPost() {
  var timestamp = new Date($("#card-container .card:first-of-type").data('time'));

  timestamp = timestamp.getTime();

  $.getJSON(window.hashtagWallConfig.apiBaseUrl + "/posts/" + timestamp, function (posts) {
    if (posts.length > 0) {
      posts.forEach(function (item) {
        if (spotlight.indexOf(item) == -1) {
          spotlight.push(item);
          toggleModalShow(item);
        }
      });
    }
  });
}

function toggleModalShow(item) {
  $("#popup").remove();
  $("#modal-content").append(popupTemplate(item));

  var modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");
  setTimeout(toggleModalHide, 3000);//counts 3 seconds before toggling it again to be hidden
  spotlight.shift();
}

function toggleModalHide() {
  var modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal"); //toggles the div to be hidden
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
        //spotlight.push(elem);
      });

      $("#card-container").prepend(elements);

      imagesLoaded("#card-container", function () {
        var Y = window.scrollY; //save screen vertical position
        iso.prepended(elements);
        window.scrollTo(0, Y); // go back to saved position
      });
    }
  });
}
