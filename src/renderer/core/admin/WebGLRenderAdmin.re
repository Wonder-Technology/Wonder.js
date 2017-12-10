open StateDataType;

open RenderConfigSystem;

let filterHardwareRelatedSetting =
    ({platform, backend, browser}: render_setting)
    : hardwareRelatedSetting => {
  platform,
  backend,
  browser
};

let decideSpecificRenderSettingAndSetToState =
    (state: StateDataType.state, hardwareSetting: hardwareRelatedSetting) =>
  /* todo set specific render setting

     diferent setting can has different jobs mapping to the same job name.
     e.g.
     "render" -> {
         "render_basic" in "mobile" platform
         "render_light" in "pc" platform
     }

     and "render" is used in xxx_pipeline->jobs
     */
  state;

let init = (state: StateDataType.state) => {
  open Render_setting;
  open Json;
  open Decode;
  let state =
    state
    |> getRenderSetting
    |> filterHardwareRelatedSetting
    |> decideSpecificRenderSettingAndSetToState(state);
  state
  |> execJobs(
       [@bs] DeviceManagerSystem.getGl(state),
       getInitPipelineExecutableJobs(
         getRenderSetting(state),
         getInitPipelines(state),
         getInitJobs(state)
       )
     )
};

let render = (state: StateDataType.state) =>
  Render_setting.(
    Json.(
      Decode.(
        state
        |> execJobs(
             [@bs] DeviceManagerSystem.getGl(state),
             getRenderPipelineExecutableJobs(
               getRenderSetting(state),
               getRenderPipelines(state),
               getRenderJobs(state)
             )
           )
      )
    )
  );