# Progressive Image Viewer - Online Tool


## Prepare images

```sh
brew install imagemagick mozjpeg
wget -O sample.jpeg https://source.unsplash.com/random/480x320
convert sample.jpeg pnm:- | cjpeg -progressive -quality 95 > progressive.jpeg

convert sample.jpeg -interlace GIF sample.gif
convert sample.jpeg -interlace PNG sample.png

```

## Build 

```sh
npm ci
npm run build
```


