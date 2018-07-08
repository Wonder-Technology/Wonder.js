open StateDataMainType;

open SettingType;

let execJob = (_, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setGl(
         ViewService.unsafeGetCanvas(state.viewRecord)
         |> GlService.createGl(
              ContextConfigSettingService.convertContextConfigDataToJsObj(
                OperateSettingService.unsafeGetContext(state.settingRecord)
              )
            )
       )
};