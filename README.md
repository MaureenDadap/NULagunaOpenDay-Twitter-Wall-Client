# Hashtag Wall Client

A website that displays posts from several social media sources. Automatically updates the feed with set intervals. Uses [Hashtag-Wall-Server](https://github.com/MaureenDadap/Hashtag-Wall-Server) to fetch the data.

Forked from [Krisseck's](https://github.com/Krisseck) [Hashtag-Wall-Client](https://github.com/Krisseck/Hashtag-Wall-Client).
### To build and customize

Run `yarn`to install dependencies

**CSS**

This project uses SASS for theming, the source can be found in `src/sass`

**Building**

Webpack is used for building the site.

`yarn dev` = Starts a live-reload dev server that watches the source materials in `src` folder.

`yarn build` = Builds the website to the `dist` folder

