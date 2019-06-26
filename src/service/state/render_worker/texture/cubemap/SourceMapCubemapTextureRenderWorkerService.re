open StateDataRenderWorkerType;

open RenderWorkerCubemapTextureType;

let _addPXSource = (texture, imageBitmap, state) => {
  let {pxSourceMap} =
    RecordCubemapTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, pxSourceMap)
  |> ignore;
  state;
};

let _addNXSource = (texture, imageBitmap, state) => {
  let {nxSourceMap} =
    RecordCubemapTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, nxSourceMap)
  |> ignore;
  state;
};

let _addPYSource = (texture, imageBitmap, state) => {
  let {pySourceMap} =
    RecordCubemapTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, pySourceMap)
  |> ignore;
  state;
};

let _addNYSource = (texture, imageBitmap, state) => {
  let {nySourceMap} =
    RecordCubemapTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, nySourceMap)
  |> ignore;
  state;
};

let _addPZSource = (texture, imageBitmap, state) => {
  let {pzSourceMap} =
    RecordCubemapTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, pzSourceMap)
  |> ignore;
  state;
};

let _addNZSource = (texture, imageBitmap, state) => {
  let {nzSourceMap} =
    RecordCubemapTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.addSource(texture, imageBitmap, nzSourceMap)
  |> ignore;
  state;
};

let _getFlipYFunc = (texture, state) => {
  let {flipYs} = RecordCubemapTextureRenderWorkerService.getRecord(state);

  /* WonderLog.Log.print(
(     texture, 
flipYs )
  ) |> ignore; */

  OperateTypeArrayAllCubemapTextureService.isFlipY(
    texture,
    flipYs |> OptionService.unsafeGet,
  );
};

let _convertImageArrayBufferDataToImageBitmapStream =
    (imageArrayBufferIndexSizeDataArr, addSourceFunc, state) =>
  WonderBsMost.Most.from(imageArrayBufferIndexSizeDataArr)
  |> WonderBsMost.Most.flatMap(((arrayBuffer, width, height, texture)) =>
       ImageBitmapRenderWorkerService.createImageBitmapFromImageData(
         (arrayBuffer, width, height),
         _getFlipYFunc(texture),
         state,
       )
       |> WonderBsMost.Most.fromPromise
       |> WonderBsMost.Most.map(imageBitmap =>
            addSourceFunc(texture, imageBitmap, state)
          )
     );

let _convertAllImageArrayBufferDataToImageBitmapStream =
    (
      (
        pxImageArrayBufferIndexSizeDataArr,
        nxImageArrayBufferIndexSizeDataArr,
        pyImageArrayBufferIndexSizeDataArr,
        nyImageArrayBufferIndexSizeDataArr,
        pzImageArrayBufferIndexSizeDataArr,
        nzImageArrayBufferIndexSizeDataArr,
      ),
      state,
    ) =>
  [|
    _convertImageArrayBufferDataToImageBitmapStream(
      pxImageArrayBufferIndexSizeDataArr,
      _addPXSource,
      state,
    ),
    _convertImageArrayBufferDataToImageBitmapStream(
      nxImageArrayBufferIndexSizeDataArr,
      _addNXSource,
      state,
    ),
    _convertImageArrayBufferDataToImageBitmapStream(
      pyImageArrayBufferIndexSizeDataArr,
      _addPYSource,
      state,
    ),
    _convertImageArrayBufferDataToImageBitmapStream(
      nyImageArrayBufferIndexSizeDataArr,
      _addNYSource,
      state,
    ),
    _convertImageArrayBufferDataToImageBitmapStream(
      pzImageArrayBufferIndexSizeDataArr,
      _addPZSource,
      state,
    ),
    _convertImageArrayBufferDataToImageBitmapStream(
      nzImageArrayBufferIndexSizeDataArr,
      _addNZSource,
      state,
    ),
  |]
  |> WonderBsMost.Most.mergeArray;

let addSourceFromImageDataStream =
    (imageArrayBufferIndexSizeDataArrData, state) =>
  _convertAllImageArrayBufferDataToImageBitmapStream(
    imageArrayBufferIndexSizeDataArrData,
    state,
  );