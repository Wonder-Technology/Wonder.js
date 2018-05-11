type imageData = {. "data": {. "buffer": Js.Typed_array.ArrayBuffer.t}};

type uint8ClampedArray;

type canvasContext = {
  .
  "drawImage": (DomType.imageElement, float, float) => unit,
  "getImageData": (float, float, int, int) => imageData
};