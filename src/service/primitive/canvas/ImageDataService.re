let getImageData = (source, width, height) => {
  let canvas = DomService.buildCanvas();
  let ctx = Canvas.getCanvasContext(canvas);
  canvas##width#=width;
  canvas##height#=height;
  ctx##drawImage(source, 0., 0.);
  ctx##getImageData(0., 0., width, height)
};

let getArrayBuffer = (imageData) => imageData##data##buffer;