open CanvasType;

[@bs.send]
external getCanvasContext : ('canvas, [@bs.as "2d"] _) => canvasContext =
  "getContext";

[@bs.new]
external newImageData : (uint8ClampedArray, float, float) => imageData =
  "ImageData";

[@bs.new]
external newUint8ClampedArray :
  Js.Typed_array.ArrayBuffer.t => uint8ClampedArray =
  "Uint8ClampedArray";

let drawImage:
  (WonderWebgl.DomExtendType.imageElement, float, float, canvasContext) =>
  canvasContext = [%bs.raw
  {|
    function(source, x, y, context){
      context.drawImage(source, x, y);
      return context
    }
    |}
];

let getImageData: (float, float, int, int, canvasContext) => imageData = [%bs.raw
  {|
    function(x, y, width, height, context){
      return context.getImageData(x, y, width, height);
    }
    |}
];

let putImageData: (imageData, float, float, canvasContext) => unit = [%bs.raw
  {|
    function(imageData, x, y, context){
      context.putImageData(imageData, x, y);
    }
    |}
];