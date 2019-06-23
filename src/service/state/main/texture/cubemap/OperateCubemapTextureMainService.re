open StateDataMainType;

open CubemapTextureType;

let unsafeGetPXSource = (texture, state) => {
  let {pxSourceMap} = RecordCubemapTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, pxSourceMap);
};

let unsafeGetNXSource = (texture, state) => {
  let {nxSourceMap} = RecordCubemapTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, nxSourceMap);
};

let unsafeGetPYSource = (texture, state) => {
  let {pySourceMap} = RecordCubemapTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, pySourceMap);
};

let unsafeGetNYSource = (texture, state) => {
  let {nySourceMap} = RecordCubemapTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, nySourceMap);
};

let unsafeGetPZSource = (texture, state) => {
  let {pzSourceMap} = RecordCubemapTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, pzSourceMap);
};

let unsafeGetNZSource = (texture, state) => {
  let {nzSourceMap} = RecordCubemapTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, nzSourceMap);
};

let setPXSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {pxSourceMap, needAddedPXSourceArray} =
        RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, pxSourceMap)
      |> ignore;
      needAddedPXSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {pxSourceMap} = RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, pxSourceMap)
      |> ignore;
      state;
    };

let setNXSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {nxSourceMap, needAddedNXSourceArray} =
        RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, nxSourceMap)
      |> ignore;
      needAddedNXSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {nxSourceMap} = RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, nxSourceMap)
      |> ignore;
      state;
    };

let setPYSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {pySourceMap, needAddedPYSourceArray} =
        RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, pySourceMap)
      |> ignore;
      needAddedPYSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {pySourceMap} = RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, pySourceMap)
      |> ignore;
      state;
    };

let setNYSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {nySourceMap, needAddedNYSourceArray} =
        RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, nySourceMap)
      |> ignore;
      needAddedNYSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {nySourceMap} = RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, nySourceMap)
      |> ignore;
      state;
    };

let setPZSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {pzSourceMap, needAddedPZSourceArray} =
        RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, pzSourceMap)
      |> ignore;
      needAddedPZSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {pzSourceMap} = RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, pzSourceMap)
      |> ignore;
      state;
    };

let setNZSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {nzSourceMap, needAddedNZSourceArray} =
        RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, nzSourceMap)
      |> ignore;
      needAddedNZSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {nzSourceMap} = RecordCubemapTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, nzSourceMap)
      |> ignore;
      state;
    };

let convertNeedAddedSourceArrayToImageDataArr = OperateTextureMainService.convertNeedAddedSourceArrayToImageDataArr;

let getWrapS = (texture, state) => {
  let {wrapSs} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getWrapS(texture, wrapSs);
};

let setWrapS = (texture, wrapS, state) => {
  let {wrapSs} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setWrapS(texture, wrapS, wrapSs)
  |> ignore;
  state;
};

let getWrapT = (texture, state) => {
  let {wrapTs} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getWrapT(texture, wrapTs);
};

let setWrapT = (texture, wrapT, state) => {
  let {wrapTs} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setWrapT(texture, wrapT, wrapTs)
  |> ignore;
  state;
};

let getMagFilter = (texture, state) => {
  let {magFilters} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getMagFilter(texture, magFilters);
};

let setMagFilter = (texture, filter, state) => {
  let {magFilters} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setMagFilter(
    texture,
    filter,
    magFilters,
  )
  |> ignore;
  state;
};

let getMinFilter = (texture, state) => {
  let {minFilters} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getMinFilter(texture, minFilters);
};

let setMinFilter = (texture, filter, state) => {
  let {minFilters} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setMinFilter(
    texture,
    filter,
    minFilters,
  )
  |> ignore;
  state;
};

let getPXFormat = (texture, state) => {
  let {pxFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, pxFormats);
};

let setPXFormat = (texture, format, state) => {
  let {pxFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFormat(
    texture,
    format,
    pxFormats,
  )
  |> ignore;
  state;
};

let getNXFormat = (texture, state) => {
  let {nxFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, nxFormats);
};

let setNXFormat = (texture, format, state) => {
  let {nxFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFormat(
    texture,
    format,
    nxFormats,
  )
  |> ignore;
  state;
};

let getPYFormat = (texture, state) => {
  let {pyFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, pyFormats);
};

let setPYFormat = (texture, format, state) => {
  let {pyFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFormat(
    texture,
    format,
    pyFormats,
  )
  |> ignore;
  state;
};

let getNYFormat = (texture, state) => {
  let {nyFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, nyFormats);
};

let setNYFormat = (texture, format, state) => {
  let {nyFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFormat(
    texture,
    format,
    nyFormats,
  )
  |> ignore;
  state;
};

let getPZFormat = (texture, state) => {
  let {pzFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, pzFormats);
};

let setPZFormat = (texture, format, state) => {
  let {pzFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFormat(
    texture,
    format,
    pzFormats,
  )
  |> ignore;
  state;
};

let getNZFormat = (texture, state) => {
  let {nzFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, nzFormats);
};

let setNZFormat = (texture, format, state) => {
  let {nzFormats} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFormat(
    texture,
    format,
    nzFormats,
  )
  |> ignore;
  state;
};

let getPXType = (texture, state) => {
  let {pxTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getType(texture, pxTypes);
};

let setPXType = (texture, type_, state) => {
  let {pxTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setType(texture, type_, pxTypes)
  |> ignore;
  state;
};

let getNXType = (texture, state) => {
  let {nxTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getType(texture, nxTypes);
};

let setNXType = (texture, type_, state) => {
  let {nxTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setType(texture, type_, nxTypes)
  |> ignore;
  state;
};

let getPYType = (texture, state) => {
  let {pyTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getType(texture, pyTypes);
};

let setPYType = (texture, type_, state) => {
  let {pyTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setType(texture, type_, pyTypes)
  |> ignore;
  state;
};

let getNYType = (texture, state) => {
  let {nyTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getType(texture, nyTypes);
};

let setNYType = (texture, type_, state) => {
  let {nyTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setType(texture, type_, nyTypes)
  |> ignore;
  state;
};

let getPZType = (texture, state) => {
  let {pzTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getType(texture, pzTypes);
};

let setPZType = (texture, type_, state) => {
  let {pzTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setType(texture, type_, pzTypes)
  |> ignore;
  state;
};

let getNZType = (texture, state) => {
  let {nzTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getType(texture, nzTypes);
};

let setNZType = (texture, type_, state) => {
  let {nzTypes} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setType(texture, type_, nzTypes)
  |> ignore;
  state;
};

let getFlipY = (texture, state): bool => {
  let {flipYs} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.getFlipY(texture, flipYs)
  |> BufferTextureService.getFlipYFromTypeArrayValue;
};

let setFlipY = (texture, flipY: bool, state) => {
  let {flipYs} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setFlipY(
    texture,
    BufferTextureService.getFlipYTypeArrayValue(flipY),
    flipYs,
  )
  |> ignore;
  state;
};

let getIsNeedUpdate = (texture, state) => {
  let {isNeedUpdates} = RecordCubemapTextureMainService.getRecord(state);

  OperateTypeArrayAllCubemapTextureService.getIsNeedUpdate(.
    texture,
    isNeedUpdates,
  );
};

let setIsNeedUpdate = (texture, isNeedUpdate, state) => {
  let {isNeedUpdates} = RecordCubemapTextureMainService.getRecord(state);
  OperateTypeArrayAllCubemapTextureService.setIsNeedUpdate(
    texture,
    isNeedUpdate,
    isNeedUpdates,
  )
  |> ignore;
  state;
};

let clearNeedAddedSourceArr = state => {
  ...state,
  cubemapTextureRecord:
    Some({
      ...RecordCubemapTextureMainService.getRecord(state),
      needAddedPXSourceArray: [||],
      needAddedNXSourceArray: [||],
      needAddedPYSourceArray: [||],
      needAddedNYSourceArray: [||],
      needAddedPZSourceArray: [||],
      needAddedNZSourceArray: [||],
    }),
};