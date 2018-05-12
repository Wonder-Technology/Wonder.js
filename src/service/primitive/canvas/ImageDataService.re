let getImageData = (source, width, height) => {
  let canvas = DomService.buildCanvas() |> Obj.magic;
  let ctx = Canvas.getCanvasContext(canvas);
  canvas##width#=width;
  canvas##height#=height;
  ctx |> Canvas.drawImage(source, 0., 0.) |> Canvas.getImageData(0., 0., width, height)
};

let getArrayBuffer = (imageData) => imageData##data##buffer;