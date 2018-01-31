open GameObjectType;

open RenderJobConfigType;

let _unsafeGetRenderJobConfig = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|render job config exist|j}, ~actual={j|not|j}),
              () => state.renderJobConfig |> assertExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  state.renderJobConfig |> Js.Option.getExn
};

let getInitPipelines = (state: StateDataType.state) =>
  _unsafeGetRenderJobConfig(state).init_pipelines;

let getInitJobs = (state: StateDataType.state) => _unsafeGetRenderJobConfig(state).init_jobs;

let getRenderPipelines = (state: StateDataType.state) =>
  _unsafeGetRenderJobConfig(state).render_pipelines;

let getRenderJobs = (state: StateDataType.state) => _unsafeGetRenderJobConfig(state).render_jobs;

let getShaders = (state: StateDataType.state) => _unsafeGetRenderJobConfig(state).shaders;

let getShaderLibs = (state: StateDataType.state) => _unsafeGetRenderJobConfig(state).shader_libs;

let getRenderSetting = (state: StateDataType.state) =>
  _unsafeGetRenderJobConfig(state).render_setting;

let _getExecutableJob = (jobs: array(job), {name: jobItemName, flags}: jobItem) => {
  let {shader}: job =
    JobConfigSystem.findFirst(
      jobs,
      jobItemName,
      ({name: jobName}: job) => JobConfigSystem.filterTargetName(jobName, jobItemName)
    );
  {name: jobItemName, flags, shader}
};

let _getPipelineExecutableJobs = (pipeline, pipelines, jobs: array(job)) => {
  let pipelineItem: pipeline =
    JobConfigSystem.findFirst(
      pipelines,
      pipeline,
      ({name}: pipeline) => JobConfigSystem.filterTargetName(name, pipeline)
    );
  pipelineItem.jobs |> Js.Array.map(_getExecutableJob(jobs))
};

let getInitPipelineExecutableJobs = ({init_pipeline}, init_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(init_pipeline, init_pipelines, jobs);

let getRenderPipelineExecutableJobs = ({render_pipeline}, render_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(render_pipeline, render_pipelines, jobs);

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shader_libs) =>
  JobConfigSystem.findFirst(
    shaderLibs,
    shaderLibName,
    (item: shaderLib) => JobConfigSystem.filterTargetName(item.name, shaderLibName)
  );

/* |> WonderLog.Contract.ensureCheck(
     (first) => {
       open WonderLog;
       open Contract;
       open Operators;
       let shaderLibsJson = WonderLog.Log.getJsonStr(shaderLibs);
       test(
         Log.buildAssertMessage(~expect={j|find $shaderLibName in $shaderLibsJson|j}, ~actual={j|not|j}),
         () => first |> assertNullableExist
       )
     },
     StateData.stateData.isDebug
   ); */
let _getMaterialShaderLibDataArrByGroup =
    (groups: array(shaderMapData), name, shaderLibs, resultDataArr) =>
  Js.Array.concat(
    JobConfigSystem.findFirst(
      groups,
      name,
      (item) => JobConfigSystem.filterTargetName(item.name, name)
    ).
      value
    |> Js.Array.map((name: string) => _findFirstShaderData(name, shaderLibs)),
    resultDataArr
  );

let _getMaterialShaderLibDataArrByStaticBranchModelMatrixInstance =
    ((gameObject, state), (shaderLibs, value), resultDataArr) =>
  resultDataArr
  |> ArraySystem.push(
       _findFirstShaderData(
         if (InstanceUtils.isSourceInstance(gameObject, state)) {
           if (InstanceUtils.isSupportInstance(state)) {
             value[1]
           } else {
             value[2]
           }
         } else {
           value[0]
         },
         shaderLibs
       )
     );

let _getMaterialShaderLibDataArrByStaticBranch =
    ((gameObject, name, state), (static_branchs: array(shaderMapData), shaderLibs), resultDataArr) =>
  switch name {
  | "modelMatrix_instance" =>
    let {value} =
      JobConfigSystem.findFirst(
        static_branchs,
        name,
        (item) => JobConfigSystem.filterTargetName(item.name, name)
      );
    _getMaterialShaderLibDataArrByStaticBranchModelMatrixInstance(
      (gameObject, state),
      (shaderLibs, value),
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      () =>
        WonderLog.Log.buildDebugJsonMessage(
          ~description={j|static_branchs|j},
          ~var=static_branchs
        ),
      StateData.stateData.isDebug
    );
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getMaterialShaderLibDataArrByStaticBranch",
        ~description={j|unknown name:$name|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _getMaterialShaderLibDataArrByType =
    (
      (type_, groups: array(shaderMapData), name, gameObject, state),
      (shaderLibs, static_branchs: array(shaderMapData)),
      resultDataArr
    ) =>
  switch type_ {
  | "group" => _getMaterialShaderLibDataArrByGroup(groups, name, shaderLibs, resultDataArr)
  | "static_branch" =>
    _getMaterialShaderLibDataArrByStaticBranch(
      (gameObject, name, state),
      (static_branchs: array(shaderMapData), shaderLibs),
      resultDataArr
    )
  | _ =>
    WonderLog.Log.debugJson(
      () => WonderLog.Log.buildDebugJsonMessage(~description={j|shaderLibs|j}, ~var=shaderLibs),
      StateData.stateData.isDebug
    );
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getMaterialShaderLibDataArrByType",
        ~description={j|unknown type_:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let getMaterialShaderLibDataArr =
    (
      gameObject: gameObject,
      ({static_branchs, groups}, shaderLibItems, shaderLibs: shader_libs),
      state: StateDataType.state
    ) =>
  shaderLibItems
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (resultDataArr, {type_, name}: shaderLibItem) =>
           switch type_ {
           | None => resultDataArr |> ArraySystem.push(_findFirstShaderData(name, shaderLibs))
           | Some(type_) =>
             _getMaterialShaderLibDataArrByType(
               (type_, groups, name, gameObject, state),
               (shaderLibs, static_branchs),
               resultDataArr
             )
           }
       ),
       WonderCommonlib.ArraySystem.createEmpty()
     );

let throwJobFlagsShouldBeDefined = () =>
  ExceptionHandleSystem.throwMessage("jobFlags should be defined");