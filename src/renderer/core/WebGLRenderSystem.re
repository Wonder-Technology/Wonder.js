open StateDataType;

let getInitPipelines = (state: StateDataType.state) => state.renderConfig.init_pipelines;

let getInitJobs = (state: StateDataType.state) => state.renderConfig.init_jobs;

let getRenderSetting = (state: StateDataType.state) => state.renderConfig.render_setting;

let getJobHandleMap = (state: StateDataType.state) => state.renderConfig.jobHandleMap;

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

  /* todo refactor? */
let _findFirstByName = (targetName: string, arr, func) =>
  arr |> ArraySystem.filter((item) => [@bs]( func(item, targetName) )) |> ArraySystem.unsafePop;

let _filterTargetName = (name, targetName) => name == targetName;

let getInitPipelineJobs = ({init_pipeline}, init_pipelines: init_pipelines, mapFunc) => {
  let init_pipelineItem: initPipeline =
    _findFirstByName(
      init_pipeline,
      init_pipelines,
      [@bs]( ({name}: initPipeline, targetName) => _filterTargetName(name, targetName) )
    );
  init_pipelineItem.jobs |> ArraySystem.map(mapFunc)
};

let execJobs = (jobs: array(job), state: StateDataType.state) : state => {
  let mutableState = ref(state);
  let jobHandleMap = getJobHandleMap(mutableState^);
  jobs |> ArraySystem.forEach(({name}: job) => 
  mutableState :=
    (
      switch (HashMapSystem.get(name, jobHandleMap)) {
      | None => mutableState^
      | Some(handle) => handle(mutableState^)
      }
    )
);
  mutableState^
};

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
       getInitPipelineJobs(
         getRenderSetting(state),
         getInitPipelines(state),
         ({name}) =>
           _findFirstByName(
             name,
             getInitJobs(state),
             [@bs]( ({name} : job, targetName) => _filterTargetName(name, targetName) )
           )
       ))};
/* todo finish render */
/* let render (state: StateDataType.state) =>
   state |> getRenderSetting |> getRenderPipelineJobs |> execJobs; */
