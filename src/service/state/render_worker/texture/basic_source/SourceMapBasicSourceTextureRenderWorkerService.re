open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

open AllBrowserDetectType;

open BrowserType;

/* let _createImageBitmap = (texture, imageData, state) => {
     let {browser} = RecordBrowserDetectRenderWorkerService.getRecord(state);
     switch (browser) {
     | Chrome =>
       let {flipYs} =
         RecordBasicSourceTextureRenderWorkerService.getRecord(state);
       let flipY =
         OperateTypeArrayAllBasicSourceTextureService.isFlipY(
           texture,
           flipYs |> OptionService.unsafeGet,
         );
       _createImageBitmapForChrome(
         imageData,
         {"imageOrientation": flipY === true ? "flipY" : "none"},
       );
     | Firefox => _createImageBitmapForFirefox(imageData)
     | _ =>
       RecordAllBrowserDetectService.fatalUnknownBrowser(
         "_createImageBitmap",
         browser,
       )
     };
   }; */

let _addSource = (texture, imageBitmap, state) => {
  /* WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;
         let {sourceMap} =
           RecordBasicSourceTextureRenderWorkerService.getRecord(state);
         test(
           Log.buildAssertMessage(
             ~expect={j|sourceMap shouldn't has source before|j},
             ~actual={j|has|j},
           ),
           () =>
           TextureSourceMapService.hasSource(texture, sourceMap) |> assertFalse
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
  let {sourceMap} =
    RecordBasicSourceTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, sourceMap) |> ignore;
  state;
};

let _getFlipYFunc = (texture, state) => {
  let {flipYs} =
    RecordBasicSourceTextureRenderWorkerService.getRecord(state);

  OperateTypeArrayAllBasicSourceTextureService.isFlipY(
    texture,
    flipYs |> OptionService.unsafeGet,
  );
};

let _convertImageArrayBufferDataToImageBitmapStream =
    (imageArrayBufferIndexSizeDataArr, state) =>
  WonderBsMost.Most.from(imageArrayBufferIndexSizeDataArr)
  |> WonderBsMost.Most.flatMap(((arrayBuffer, width, height, texture)) =>
       ImageBitmapRenderWorkerService.createImageBitmapFromImageData(
         (arrayBuffer, width, height),
         _getFlipYFunc(texture),
         state,
       )
       |> WonderBsMost.Most.fromPromise
       |> WonderBsMost.Most.map(imageBitmap =>
            _addSource(texture, imageBitmap, state)
          )
     );

let addSourceFromImageDataStream = (imageArrayBufferIndexSizeDataArr, state) =>
  _convertImageArrayBufferDataToImageBitmapStream(
    imageArrayBufferIndexSizeDataArr,
    state,
  );