open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

let _addSource = (texture, imageBitmap, state) => {
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