open StateDataMainType;

open BasicSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap)
};

let setSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {sourceMap, needAddedSourceArray} = RecordBasicSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      needAddedSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state
    } :
    {
      let {sourceMap} = RecordBasicSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      state
    };

let convertNeedAddedSourceArrayToImageDataArr = (needAddedSourceArray) =>
  needAddedSourceArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (imageDataArr, (texture, source)) => {
           let width = source##width;
           let height = source##height;
           imageDataArr
           |> ArrayService.push((
                ImageDataService.getImageData(source, width, height)
                |> ImageDataService.getArrayBuffer,
                width,
                height,
                texture
              ))
         }
       ),
       [||]
     );

let getWrapS = (texture, state) => {
  let {wrapSs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.getWrapS(texture, wrapSs)
};

let setWrapS = (texture, wrapS, state) => {
  let {wrapSs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.setWrapS(texture, wrapS, wrapSs) |> ignore;
  state
};

let getWrapT = (texture, state) => {
  let {wrapTs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.getWrapT(texture, wrapTs)
};

let setWrapT = (texture, wrapT, state) => {
  let {wrapTs} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.setWrapT(texture, wrapT, wrapTs) |> ignore;
  state
};

let getMagFilter = (texture, state) => {
  let {magFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.getMagFilter(texture, magFilters)
};

let setMagFilter = (texture, filter, state) => {
  let {magFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.setMagFilter(texture, filter, magFilters) |> ignore;
  state
};

let getMinFilter = (texture, state) => {
  let {minFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.getMinFilter(texture, minFilters)
};

let setMinFilter = (texture, filter, state) => {
  let {minFilters} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.setMinFilter(texture, filter, minFilters) |> ignore;
  state
};

let getFormat = (texture, state) => {
  let {formats} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.getFormat(texture, formats)
};

let setFormat = (texture, filter, state) => {
  let {formats} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.setFormat(texture, filter, formats) |> ignore;
  state
};

let getType = (texture, state) => {
  let {types} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.getType(texture, types)
};

let setType = (texture, filter, state) => {
  let {types} = RecordBasicSourceTextureMainService.getRecord(state);
  OperateTypeArrayBasicSourceTextureService.setType(texture, filter, types) |> ignore;
  state
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
        ~params={j||j}
      )
    )
  | Some(source) => TextureSizeService.getWidth(source)
  }
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
        ~params={j||j}
      )
    )
  | Some(source) => TextureSizeService.getHeight(source)
  }
};