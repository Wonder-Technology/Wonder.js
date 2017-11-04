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
  |> execJobItems(
       getInitPipelineJobs(
         getRenderSetting(state),
         getInitPipelines(state),
         ({name: targetName}) =>
           findFirst(
             getInitJobs(state),
             [@bs] (({name}: job) => _filterTargetName(name, targetName))
           )
       )
     )
};

/* todo refactor with init */
let render = (state: StateDataType.state) =>
  Render_setting.(
    Json.(
      Decode.(
        state
        |> execJobItems(
             getRenderPipelineJobs(
               getRenderSetting(state),
               getRenderPipelines(state),
               ({name: targetName}) =>
                 findFirst(
                   getRenderJobs(state),
                   [@bs] (({name}: job) => _filterTargetName(name, targetName))
                 )
             )
           )
      )
    )
  );