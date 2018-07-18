open StateDataMainType;

let execJob = (_, {imguiRecord} as state) => {
  let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  {
    ...state,
    imguiRecord:
      WonderImgui.ManageIMGUIAPI.init(
        gl,
        RecordIMGUIMainService.getRecord(state),
      ),
  };
};