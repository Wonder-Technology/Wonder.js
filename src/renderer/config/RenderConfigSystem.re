open Contract;

open StateDataType;

let getInitPipelines = (state: StateDataType.state) => state.renderConfig.init_pipelines;

let getInitJobs = (state: StateDataType.state) => state.renderConfig.init_jobs;

let getRenderPipelines = (state: StateDataType.state) => state.renderConfig.render_pipelines;

let getRenderJobs = (state: StateDataType.state) => state.renderConfig.render_jobs;

let getShaders = (state: StateDataType.state) => state.renderConfig.shaders;

let getShaderLibs = (state: StateDataType.state) => state.renderConfig.shader_libs;

let getRenderSetting = (state: StateDataType.state) => state.renderConfig.render_setting;

let getJobHandleMap = (state: StateDataType.state) => state.renderConfig.jobHandleMap;

/* let findFirstByName = (targetName: string, arr, func) =>
   arr |> ArraySystem.filter((item) => [@bs]( func(item, targetName) )) |> ArraySystem.unsafePop; */
let findFirst = (arr: array('a), func) =>
  arr |> ArraySystem.filter((item: 'a) => [@bs] func(item)) |> ArraySystem.pop |> Js.Option.getExn;

/* |> ensureCheck(
     (r) =>
       Contract.Operators.(
         test("the first one which match condition should exist", () => Js.Nullable.to_opt (r) |> assertExist)
       )
   ); */
let _filterTargetName = (name, targetName) => name == targetName;

let _getExecutableJob = (jobs: array(job), {name: jobItemName, flags}: jobItem) => {
  let {shader}: job =
    findFirst(jobs, [@bs] (({name: jobName}: job) => _filterTargetName(jobName, jobItemName)));
  {name: jobItemName, flags, shader}
};

let getInitPipelineExecutableJobs = ({init_pipeline}, init_pipelines, jobs: array(job)) => {
  let init_pipelineItem: pipeline =
    findFirst(
      init_pipelines,
      [@bs] (({name}: pipeline) => _filterTargetName(name, init_pipeline))
    );
  /* init_pipelineItem.jobs |> ArraySystem.map(mapFunc) |> ArraySystem.map(_getExecutableJob(jobs)) */
  init_pipelineItem.jobs |> ArraySystem.map(_getExecutableJob(jobs))
};

let getRenderPipelineExecutableJobs = ({render_pipeline}, render_pipelines, jobs: array(job)) => {
  let render_pipelineItem: pipeline =
    findFirst(
      render_pipelines,
      [@bs] (({name}: pipeline) => _filterTargetName(name, render_pipeline))
    );
  render_pipelineItem.jobs |> ArraySystem.map(_getExecutableJob(jobs))
};

let execJobs = (gl, jobs: array(executableJob), state: StateDataType.state) : state => {
  /* let mutableState = ref(state);
     let jobHandleMap = getJobHandleMap(mutableState^);
     jobs
     |> ArraySystem.forEach(
          ({name, flags, shader}: executableJob) =>
            /* let flags =
               switch flags {
               | None => ArraySystem.createEmpty()
               | Some(flags) => flags
               }; */
            mutableState :=
              (
                switch (HashMapSystem.get(name, jobHandleMap)) {
                | None => mutableState^
                | Some(handle) => handle((flags, shader), gl, mutableState^)
                }
              )
        );
     mutableState^ */
  let jobHandleMap = getJobHandleMap(state);
  jobs
  |> ArraySystem.reduce(
       (state, {name, flags, shader}: executableJob) =>
         switch (HashMapSystem.get(name, jobHandleMap)) {
         | None => state
         | Some(handle) => handle((flags, shader), gl, state)
         },
       state
     )
};

let _findFirstShaderData = (shaderLibName: string, shaderLibs: shader_libs) =>
  findFirst(shaderLibs, [@bs] ((item) => _filterTargetName(item.name, shaderLibName)));

let getMaterialShaderLibDataArr =
    (materialIndex: int, groups: array(shaderGroup), shaderLibItems, shaderLibs: shader_libs) => {
  let resultDataArr = ArraySystem.createEmpty();
  shaderLibItems
  |> ArraySystem.forEach(
       ({type_, name}: shaderLibItem) =>
         switch type_ {
         | None =>
           ArraySystem.push(_findFirstShaderData(name, shaderLibs), resultDataArr) |> ignore
         | Some(type_) =>
           switch type_ {
           | "group" =>
             let group: shaderGroup =
               findFirst(
                 groups,
                 [@bs] ((item: shaderGroup) => _filterTargetName(item.name, name))
               );
             let shaderLibArr =
               group.value
               |> ArraySystem.map((name: string) => _findFirstShaderData(name, shaderLibs));
             ArraySystem.concat(shaderLibArr, resultDataArr) |> ignore
           }
         }
     );
  resultDataArr
};

let throwJobFlagsShouldBeDefined = () =>
  ExceptionHandlerSystem.throwMessage("jobFlags should be defined");