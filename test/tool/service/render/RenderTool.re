
open StateDataType;

let getRenderRecord = (state) => state.renderRecord;

let unsafeGetRenderArrayFromState = (state) =>
  state |> OperateRenderService.getRenderArray |> OptionService.unsafeGet;