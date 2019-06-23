open StateDataRenderWorkerType;

open RenderWorkerAllTextureType;

let _getData = state => state.allTextureRecord;

let getActivableTextureUnitArray = state =>
  switch (_getData(state)) {
  | None => WonderCommonlib.ArrayService.createEmpty()
  | Some({activableTextureUnitArray}) => activableTextureUnitArray
  };

let createActivableTextureUnitArray = state =>
  CreateActivableTextureUnitArrayService.create(
    OperateGPUDetectRenderWorkerService.unsafeGetMaxTextureUnit(state),
  );