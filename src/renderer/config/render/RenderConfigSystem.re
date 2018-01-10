open Contract;

open GameObjectType;

open StateDataType;

let getInitPipelines = (state: StateDataType.state) => state.renderConfig.init_pipelines;

let getInitJobs = (state: StateDataType.state) => state.renderConfig.init_jobs;

let getRenderPipelines = (state: StateDataType.state) => state.renderConfig.render_pipelines;

let getRenderJobs = (state: StateDataType.state) => state.renderConfig.render_jobs;

let getShaders = (state: StateDataType.state) => state.renderConfig.shaders;

let getShaderLibs = (state: StateDataType.state) => state.renderConfig.shader_libs;

let getRenderSetting = (state: StateDataType.state) => state.renderConfig.render_setting;

let _getJobHandleMap = (state: StateDataType.state) => state.renderConfig.jobHandleMap;

let findFirst = (arr: array('a), func) =>
  arr
  |> ArraySystem.unsafeFind(func)
  |> ensureCheck(
       (first) =>
         Contract.Operators.(test("should find result", () => first |> assertNullableExist))
     );

let _filterTargetName = (name, targetName) => name == targetName;

let _getExecutableJob = (jobs: array(job), {name: jobItemName, flags}: jobItem) => {
  let {shader}: job =
    findFirst(jobs, ({name: jobName}: job) => _filterTargetName(jobName, jobItemName));
  {name: jobItemName, flags, shader}
};

let _getPipelineExecutableJobs = (pipeline, pipelines, jobs: array(job)) => {
  let pipelineItem: pipeline =
    findFirst(pipelines, ({name}: pipeline) => _filterTargetName(name, pipeline));
  pipelineItem.jobs |> Js.Array.map(_getExecutableJob(jobs))
};

let getInitPipelineExecutableJobs = ({init_pipeline}, init_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(init_pipeline, init_pipelines, jobs);

let getRenderPipelineExecutableJobs = ({render_pipeline}, render_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(render_pipeline, render_pipelines, jobs);

let execJobs = (gl, jobs: array(executableJob), state: StateDataType.state) : state => {
  let jobHandleMap = _getJobHandleMap(state);
  jobs
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, {name, flags, shader}: executableJob) =>
           switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
           | None => state
           | Some(handle) => handle((flags, shader), gl, state)
           }
       ),
       state
     )
};

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shader_libs) =>
  findFirst(shaderLibs, (item: shaderLib) => _filterTargetName(item.name, shaderLibName));

let _getMaterialShaderLibDataArrByGroup =
    (groups: array(shaderMapData), name, shaderLibs, resultDataArr) =>
  Js.Array.concat(
    findFirst(groups, (item) => _filterTargetName(item.name, name)).value
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
    ((gameObject, name, state), (static_branchs: array(shaderMapData), shaderLibs), resultDataArr) => {
  let {value} = findFirst(static_branchs, (item) => _filterTargetName(item.name, name));
  switch name {
  | "modelMatrix_instance" =>
    _getMaterialShaderLibDataArrByStaticBranchModelMatrixInstance(
      (gameObject, state),
      (shaderLibs, value),
      resultDataArr
    )
  }
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