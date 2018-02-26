let buildSetting = (isDebug, useWorker) => {j|
 {
    "is_debug": $isDebug,
    "context": {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
    },
    "gpu": {
        "use_hardware_instance": true
    },
    "worker": {
        "use_worker": $useWorker
    }
}
        |j};

let createState = (~isDebug=Js.true_, ~useWorker=Js.false_, ()) => {
  let stateData = StateTool.getStateData();
  SettingParseSystem.convertToRecord(buildSetting(isDebug, useWorker) |> Js.Json.parseExn)
  |> ConfigDataLoaderSystem._setSetting(stateData, StateSystem.getState(stateData))
  |> StateTool.setState
};