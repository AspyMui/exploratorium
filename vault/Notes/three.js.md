#threejs
# Rendering Resolution
If you wish to keep the size of your app but render it at a lower resolution, you can do so by calling `setSize` with `false` as `updateStyle` (the third argument). For example, `setSize(window.innerWidth/2, window.innerHeight/2, false)` will render your app at half resolution, given that your `<canvas>` has 100% width and height.

This is good to keep note of since people have 4k res screens now. It would be best to render at 720 and upscale.

