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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getWrapS(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setWrapS(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getWrapT(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setWrapT(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getMagFilter(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setMagFilter(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getMinFilter(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setMinFilter(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getFormat(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setFormat(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getType(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setType(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getFlipY(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    flipYs,
  )
  |> BufferTextureService.getFlipYFromTypeArrayValue;
};

let setFlipY = (texture, flipY: bool, state) => {
  let {flipYs} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  OperateTypeArrayAllArrayBufferViewSourceTextureService.setFlipY(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    BufferTextureService.getFlipYTypeArrayValue(flipY),
    flipYs,
  )
  |> ignore;
  state;
};

let getWidth = (texture, state) => {
  let {widths} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getWidth(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setWidth(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getHeight(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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
  OperateTypeArrayAllArrayBufferViewSourceTextureService.setHeight(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
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