let getBasicRenderObjectRecord = OperateRenderRenderWorkerService.getBasicRenderObjectRecord;

let unsafeGetBasicRenderObjectRecord = state =>
  OperateRenderRenderWorkerService.getBasicRenderObjectRecord(state)
  |> OptionService.unsafeGet;