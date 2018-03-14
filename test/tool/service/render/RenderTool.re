
open MainStateDataType;

let getRenderRecord = (state) => state.renderRecord;

let unsafeGetRenderArrayFromState = (state) =>
  state |> OperateRenderMainService.getRenderArray |> OptionService.unsafeGet;