open MainStateDataType;

let getCanvas = (state) => state.viewRecord |> ViewService.getCanvas;

let unsafeGetContext = (state) => state.settingRecord |> OperateSettingService.unsafeGetContext;