open MainStateDataType;

open SettingType;

let execJob = (_, state) => {
  ...state,
  viewRecord:
    state.viewRecord
    |> ViewService.setCanvas(
         CreateCanvasService.createCanvas(OperateSettingService.getCanvasId(state.settingRecord))
       )
};