open StateDataMainType;

open RenderType;

let createActivableTextureUnitArray = state =>
  CreateActivableTextureUnitArrayService.create(
    OperateGPUDetectMainService.unsafeGetMaxTextureUnit(state),
  );

let _getData = state =>
  RecordRenderMainService.getRecord(state).textureRecord;

let unsafeGetData = state => _getData(state) |> OptionService.unsafeGet;

let getActivableTextureUnitArray = state =>
  switch (_getData(state)) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some({activableTextureUnitArray}) => activableTextureUnitArray
  };