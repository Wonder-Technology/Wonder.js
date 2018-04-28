open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      state.viewRecord =
        ViewService.setCanvas(
          CreateCanvasService.createCanvas(OperateSettingService.getCanvasId(state.settingRecord)),
          state.viewRecord
        );
      None
    }
  );