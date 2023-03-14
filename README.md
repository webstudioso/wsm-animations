 # Webstudio Animations Module

This module adds animation properties to all blocks on web apps built with `Webstudio`

 ![Webstudio Module Animations](https://github.com/webstudioso/wsm-animations/actions/workflows/production.yml/badge.svg)

### Testing and Building Module
```
npm i
npm run test
npm run build
```

### Publish to NPMJS
```
npm publish
```

### Importing Dependency in Webstudio
Add it to the project, this is compatible with `grapesjs` as well.
```shell
npm i --save wsm-animations@latest
```
To import in the editor add the file and include it as a Plugin and also include the animate.css library as part of the canvas style imports
```js
import PluginAnimations from "wsm-animations"

const editor = grapesjs.init({
    container: "#gjs",
    plugins: [
        PluginAnimations
    ],
    canvas: {
        styles: [
          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        ]
    }
})
```