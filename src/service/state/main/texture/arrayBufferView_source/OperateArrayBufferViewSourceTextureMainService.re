open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  TextureSourceMapService.unsafeGetSource(texture, sourceMap);
};

let setSource = (texture, source, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {sourceMap, needAddedSourceArray} =
        RecordArrayBufferViewSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      needAddedSourceArray |> ArrayService.push((texture, source)) |> ignore;
      state;
    } :
    {
      let {sourceMap} =
        RecordArrayBufferViewSourceTextureMainService.getRecord(state);
      TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
      state;
    };

let getWrapS = (texture, state) => {
  let {wrapSs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getWrapS(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    wrapSs,
  );
};

let setWrapS = (texture, wrapS, state) => {
  let {wrapSs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setWrapS(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    wrapS,
    wrapSs,
  )
  |> ignore;
  state;
};

let getWrapT = (texture, state) => {
  let {wrapTs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getWrapT(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    wrapTs,
  );
};

let setWrapT = (texture, wrapT, state) => {
  let {wrapTs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setWrapT(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    wrapT,
    wrapTs,
  )
  |> ignore;
  state;
};

let getMagFilter = (texture, state) => {
  let {magFilters} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getMagFilter(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    magFilters,
  );
};

let setMagFilter = (texture, filter, state) => {
  let {magFilters} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setMagFilter(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    filter,
    magFilters,
  )
  |> ignore;
  state;
};

let getMinFilter = (texture, state) => {
  let {minFilters} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getMinFilter(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    minFilters,
  );
};

let setMinFilter = (texture, filter, state) => {
  let {minFilters} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setMinFilter(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    filter,
    minFilters,
  )
  |> ignore;
  state;
};

let getFormat = (texture, state) => {
  let {formats} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getFormat(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    formats,
  );
};

let setFormat = (texture, format, state) => {
  let {formats} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setFormat(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    format,
    formats,
  )
  |> ignore;
  state;
};

let getType = (texture, state) => {
  let {types} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getType(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    types,
  );
};

let setType = (texture, type_, state) => {
  let {types} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setType(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    type_,
    types,
  )
  |> ignore;
  state;
};

let getFlipY = (texture, state): bool => {
  let {flipYs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getFlipY(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    flipYs,
  )
  |> BufferSourceTextureService.getFlipYFromTypeArrayValue;
};

let setFlipY = (texture, flipY: bool, state) => {
  let {flipYs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  OperateTypeArrayArrayBufferViewSourceTextureService.setFlipY(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    BufferSourceTextureService.getFlipYTypeArrayValue(flipY),
    flipYs,
  )
  |> ignore;
  state;
};

let getWidth = (texture, state) => {
  let {widths} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getWidth(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    widths,
  );
};

let setWidth = (texture, width, state) => {
  let {widths} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setWidth(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    width,
    widths,
  )
  |> ignore;
  state;
};

let getHeight = (texture, state) => {
  let {heights} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.getHeight(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    heights,
  );
};

let setHeight = (texture, height, state) => {
  let {heights} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService.setHeight(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    height,
    heights,
  )
  |> ignore;
  state;
};