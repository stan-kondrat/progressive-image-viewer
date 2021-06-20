# Progressive Image Viewer (Interlacing)

This tool allows you to simulate slow communication and see how the browser will display partially loaded images.

Progressive image encoding offer the more graceful approach of first loading a low-resolution version of the image as a placeholder, and then progressively increasing the quality of the image as the resource is loaded.

## How It Works

![Progressive Image Viewer - Preview](preview.gif)


## Development

### Prepare images

```sh
brew install imagemagick mozjpeg
wget -O sample.jpeg https://source.unsplash.com/random/480x320
convert sample.jpeg pnm:- | cjpeg -progressive -quality 95 > progressive.jpeg

convert sample.jpeg -interlace GIF sample.gif
convert sample.jpeg -interlace PNG sample.png

```

### Build 

```sh
npm ci
npm run build
```


