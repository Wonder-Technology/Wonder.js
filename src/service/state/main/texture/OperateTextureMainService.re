open StateDataMainType;

open TextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordTextureMainService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap)
};

let setSource = (texture, source, state) => {
  let {sourceMap} = RecordTextureMainService.getRecord(state);
  TextureSourceMapService.setSource(texture, source, sourceMap) |> ignore;
  state
};

let getWidth = (texture, state) => {
  let {widths, sourceMap} = RecordTextureMainService.getRecord(state);
  switch (OperateTypeArrayTextureService.getWidth(texture, widths)) {
  | 0 =>
    switch (TextureSourceMapService.getSource(texture, sourceMap)) {
    | None => 0
    | Some(source) => source##width
    }
  | width => width
  }
};

let setWidth = (texture, width, state) => {
  let {widths} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.setWidth(texture, width, widths) |> ignore;
  state
};

let getHeight = (texture, state) => {
  let {heights, sourceMap} = RecordTextureMainService.getRecord(state);
  switch (OperateTypeArrayTextureService.getHeight(texture, heights)) {
  | 0 =>
    switch (TextureSourceMapService.getSource(texture, sourceMap)) {
    | None => 0
    | Some(source) => source##height
    }
  | height => height
  }
};

let setHeight = (texture, height, state) => {
  let {heights} = RecordTextureMainService.getRecord(state);
  OperateTypeArrayTextureService.setHeight(texture, height, heights) |> ignore;
  state
};