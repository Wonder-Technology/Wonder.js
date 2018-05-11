open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let _createImageBitmapForChrome: (CanvasType.imageData, Js.t({..})) => imageBitmap = [%bs.raw
  {|
    function(imageData, config){
        return createImageBitmap(imageData, config)
    }
    |}
];

/* TODO handle firefox, chrome */
let _createImageBitmap = (texture, imageData, state) => {
  let flipY = OperateTypeArrayTextureService.getFlipY();
  _createImageBitmapForChrome(imageData, {"imageOrientation": flipY ? "flipY" : "none"})
};

let _addSource = (texture, imageBitmap, state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let {sourceMap} = RecordTextureRenderWorkerService.getRecord(state);
      test(
        Log.buildAssertMessage(
          ~expect={j|sourceMap shouldn't has source before|j},
          ~actual={j|has|j}
        ),
        () => TextureSourceMapService.hasSource(texture, sourceMap) |> assertFalsy
      )
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let {sourceMap} = RecordTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.setSource(texture, imageBitmap, sourceMap) |> ignore;
  state
};

let _convertImageSrcToImageBitmapStream = (imageArrayBufferIndexSizeDataArr, state) =>
  Most.from(imageArrayBufferIndexSizeDataArr)
  |> Most.flatMap(
       ((arrayBuffer, width, height, texture)) =>
         Most.fromPromise(
           _createImageBitmap(
             texture,
             Canvas.newImageData(Canvas.newUint8ClampedArray(arrayBuffer), width, height),
             state
           )
         )
         |> Most.map(
              (imageBitmap) =>
                /* TODO must check: texture is correct? */
                _addSource(texture, imageBitmap, state)
            )
     );

let addSourceMapFromImageDataStream = (imageArrayBufferIndexSizeDataArr, state) =>
  _convertImageSrcToImageBitmapStream(imageArrayBufferIndexSizeDataArr, state);