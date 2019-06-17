open StateDataMainType;

open BasicSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap);
};

let setSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {sourceMap, needAddedSourceArray} =
        RecordBasicSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      needAddedSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      state;
    };

let convertNeedAddedSourceArrayToImageDataArr = needAddedSourceArray =>
  needAddedSourceArray
  |> Js.Array.filter(((_, source)) =>
       Obj.magic(source) !== Js.Nullable.undefined
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. imageDataArr, (texture, source)) => {
         let (arrayBuffer, width, height) =
           ImageDataService.convertImageToImageData(source);

         imageDataArr
         |> ArrayService.push((arrayBuffer, width, height, texture));
       },
       [||],
     );

let getWrapS = (texture, state) => {
  let {wrapSs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getWrapS(texture, wrapSs);
};

let setWrapS = (texture, wrapS, state) => {
  let {wrapSs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setWrapS(texture, wrapS, wrapSs)
  |> ignore;
  state;
};

let getWrapT = (texture, state) => {
  let {wrapTs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getWrapT(texture, wrapTs);
};

let setWrapT = (texture, wrapT, state) => {
  let {wrapTs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setWrapT(texture, wrapT, wrapTs)
  |> ignore;
  state;
};

let getMagFilter = (texture, state) => {
  let {magFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getMagFilter(texture, magFilters);
};

let setMagFilter = (texture, filter, state) => {
  let {magFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setMagFilter(
    texture,
    filter,
    magFilters,
  )
  |> ignore;
  state;
};

let getMinFilter = (texture, state) => {
  let {minFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getMinFilter(texture, minFilters);
};

let setMinFilter = (texture, filter, state) => {
  let {minFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setMinFilter(
    texture,
    filter,
    minFilters,
  )
  |> ignore;
  state;
};

let getFormat = (texture, state) => {
  let {formats} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getFormat(texture, formats);
};

let setFormat = (texture, format, state) => {
  let {formats} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setFormat(
    texture,
    format,
    formats,
  )
  |> ignore;
  state;
};

let getType = (texture, state) => {
  let {types} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getType(texture, types);
};

let setType = (texture, filter, state) => {
  let {types} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setType(texture, filter, types)
  |> ignore;
  state;
};

let getFlipY = (texture, state) : bool => {
  let {flipYs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.getFlipY(texture, flipYs)
  |> BufferSourceTextureService.getFlipYFromTypeArrayValue;
};

let setFlipY = (texture, flipY: bool, state) => {
  let {flipYs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setFlipY(
    texture,
    BufferSourceTextureService.getFlipYTypeArrayValue(flipY),
    flipYs,
  )
  |> ignore;
  state;
};

let getWidth = (texture, state) => {
  let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);
  switch (TextureSourceMapService.getSource(texture, sourceMap)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getWidth",
        ~description={j|source should exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(source) => TextureSizeService.getWidth(source)
  };
};

let getHeight = (texture, state) => {
  let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);
  switch (TextureSourceMapService.getSource(texture, sourceMap)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getHeight",
        ~description={j|source should exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(source) => TextureSizeService.getHeight(source)
  };
};

let getIsNeedUpdate = (texture, state) => {
  let {isNeedUpdates} = RecordBasicSourceTextureMainService.getRecord(state);

  OperateTypeArrayAllBasicSourceTextureService.getIsNeedUpdate(.
    texture,
    isNeedUpdates,
  );
};

let setIsNeedUpdate = (texture, isNeedUpdate, state) => {
  let {isNeedUpdates} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService.setIsNeedUpdate(
    texture,
    isNeedUpdate,
    isNeedUpdates,
  )
  |> ignore;
  state;
};