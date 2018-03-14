open MainStateDataType;

open SettingType;

let _convertContextConfigDataToJsObj =
    ({alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer}) => {
  "alpha": Js.Boolean.to_js_boolean(alpha),
  "depth": Js.Boolean.to_js_boolean(depth),
  "stencil": Js.Boolean.to_js_boolean(stencil),
  "antialias": Js.Boolean.to_js_boolean(antialias),
  "premultipliedAlpha": Js.Boolean.to_js_boolean(premultipliedAlpha),
  "preserveDrawingBuffer": Js.Boolean.to_js_boolean(preserveDrawingBuffer)
};

let execJob = (_, state) => {
  ...state,
  deviceManagerRecord:
    state.deviceManagerRecord
    |> DeviceManagerService.setGl(
         ViewService.getCanvas(state.viewRecord)
         |> GlService.createGl(
              _convertContextConfigDataToJsObj(
                OperateSettingService.unsafeGetContext(state.settingRecord)
              )
            )
       )
};