open StateDataMainType;

let execJob = (_, {imguiRecord, viewRecord} as state) => {
  let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  {
    ...state,
    imguiRecord:
      WonderImgui.ManageIMGUIAPI.init(
        gl,
        ManageIMGUIMainService.getCanvasSize(state),
        RecordIMGUIMainService.getRecord(state),
      ),
  };
};