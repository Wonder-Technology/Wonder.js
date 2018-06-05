open StateDataMainType;

let getCanvas = state => state.viewRecord |> ViewService.getCanvas;

let setCanvas = (canvas, state) => {
  ...state,
  viewRecord: state.viewRecord |> ViewService.setCanvas(canvas),
};

let unsafeGetContext = state =>
  state.settingRecord |> OperateSettingService.unsafeGetContext;