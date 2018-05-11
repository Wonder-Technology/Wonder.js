open CanvasType;

[@bs.send] external getCanvasContext : ('canvas, [@bs.as "2d"] _) => canvasContext = "getContext";

[@bs.new] external newImageData : (uint8ClampedArray, float, float) => imageData = "ImageData";

[@bs.new] external newUint8ClampedArray : Js.Typed_array.ArrayBuffer.t => uint8ClampedArray =
  "Uint8ClampedArray";