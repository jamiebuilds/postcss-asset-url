# postcss-asset-url

Map urls to different locations

### Install

```sh
$ npm install postcss-asset-url
```

### Usage

##### Config

```js
var postcss = require("postcss");
var assetUrl = require("postcss-asset-url");

var output = postcss()
  .use(assetUrl({
    map: {
      image: "/assets/images/",
      font: "/assets/font",
      icon: "/assets/icon"
    }
  }))
  .process(css)
  .css;
```

##### Input

```css
.app {
  background-image: url(asset-url("image", "background.png"));
}

.icon-wrench {
  background-image: url(asset-url("icon", "wrench.png"));
}

@font-face {
  font-family: "Open Sans";
  src: url(asset-url("font", "opensans.eot"));
  src: url(asset-url("font", "opensans.eot?#iefix")) format("embedded-opentype"),
       url(asset-url("font", "opensans.woff2"))      format("woff2"),
       url(asset-url("font", "opensans.woff"))       format("woff"),
       url(asset-url("font", "opensans.ttf"))        format("truetype");
  font-weight: normal;
  font-style: normal;
}
```

##### Output

```css
.app {
  background-image: url("/assets/images/background.png"));
}

.icon-wrench {
  background-image: url("/assets/icons/wrench.png"));
}

@font-face {
  font-family: "Open Sans";
  src: url("/assets/fonts/opensans.eot");
  src: url("/assets/fonts/opensans.eot?#iefix") format("embedded-opentype"),
       url("/assets/fonts/opensans.woff2")      format("woff2"),
       url("/assets/fonts/opensans.woff")       format("woff"),
       url("/assets/fonts/opensans.ttf")        format("truetype");
  font-weight: normal;
  font-style: normal;
}
```
