open StateDataMainType;

let unsafeGetCanvas = state => state.viewRecord |> ViewService.unsafeGetCanvas;

let setCanvas = (canvas, state) => {
  ...state,
  viewRecord: state.viewRecord |> ViewService.setCanvas(canvas),
};

let unsafeGetContext = state =>
  state.settingRecord |> OperateSettingService.unsafeGetContext;