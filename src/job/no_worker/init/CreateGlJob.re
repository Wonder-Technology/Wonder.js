open StateDataMainType;

open SettingType;

let execJob = (_, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> AllDeviceManagerService.setGl(
         ViewService.unsafeGetCanvas(state.viewRecord)
         |> GlService.createGl(
              ContextConfigSettingService.convertContextConfigDataToJsObj(
                OperateSettingService.unsafeGetContext(state.settingRecord)
              )
            )
       )
};