open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap)
};

let setSource = (texture, source, state) =>
  /* let {sourceMap} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
     TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
     state */
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {sourceMap, needAddedSourceArray} =
        RecordArrayBufferViewSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      needAddedSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state
    } :
    {
      let {sourceMap} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      state
    };

let clearNeedAddedSourceArr = (state) => {
  ...state,
  arrayBufferViewSourceTextureRecord:
    Some({
      ...RecordArrayBufferViewSourceTextureMainService.getRecord(state),
      needAddedSourceArray: [||]
    })
};

/* let convertNeedAddedSourceArrayToImageDataArr = (needAddedSourceArray) =>
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
      ); */
let getWrapS = (texture, state) => {
  let {wrapSs} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getWrapS(texture, wrapSs)
};

let setWrapS = (texture, wrapS, state) => {
  let {wrapSs} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setWrapS(texture, wrapS, wrapSs) |> ignore;
  state
};

let getWrapT = (texture, state) => {
  let {wrapTs} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getWrapT(texture, wrapTs)
};

let setWrapT = (texture, wrapT, state) => {
  let {wrapTs} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setWrapT(texture, wrapT, wrapTs) |> ignore;
  state
};

let getMagFilter = (texture, state) => {
  let {magFilters} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getMagFilter(texture, magFilters)
};

let setMagFilter = (texture, filter, state) => {
  let {magFilters} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setMagFilter(texture, filter, magFilters)
  |> ignore;
  state
};

let getMinFilter = (texture, state) => {
  let {minFilters} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getMinFilter(texture, minFilters)
};

let setMinFilter = (texture, filter, state) => {
  let {minFilters} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setMinFilter(texture, filter, minFilters)
  |> ignore;
  state
};

let getFormat = (texture, state) => {
  let {formats} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getFormat(texture, formats)
};

let setFormat = (texture, filter, state) => {
  let {formats} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setFormat(texture, filter, formats) |> ignore;
  state
};

let getType = (texture, state) => {
  let {types} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getType(texture, types)
};

let setType = (texture, filter, state) => {
  let {types} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setType(texture, filter, types) |> ignore;
  state
};

let getWidth = (texture, state) => {
  let {widths} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getWidth(texture, widths)
};

let getHeight = (texture, state) => {
  let {heights} = RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getHeight(texture, heights)
};