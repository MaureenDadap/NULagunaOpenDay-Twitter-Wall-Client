# Hashtag Wall Client

[![dependencies](https://david-dm.org/Krisseck/Hashtag-Wall-Client.svg)](https://david-dm.org/Krisseck/Hashtag-Wall-Client)  [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Krisseck/Hashtag-Wall-Client/issues)

[![Hashtag Wall Client Example](https://github.com/Krisseck/Hashtag-Wall-Client/blob/master/hashtag-wall-example.jpg)](http://hashtag.polso.info)

A website that displays posts from several social media sources. Automatically updates the feed with set intervals. Uses [Hashtag-Wall-Server](https://github.com/MaureenDadap/Hashtag-Wall-Server) to fetch the data.

Forked from [Hashtag-Wall-client](https://github.com/Krisseck/Hashtag-Wall-Client).
### To build and customize

Run `yarn`to install dependencies

**CSS**

This project uses SASS for theming, the source can be found in `src/sass`

**Building**

Webpack is used for building the site.

`yarn dev` = Starts a live-reload dev server that watches the source materials in `src` folder.

`yarn build` = Builds the website to the `dist` folder

