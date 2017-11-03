open Contract;

open StateDataType;

let getInitPipelines = (state: StateDataType.state) => state.renderConfig.init_pipelines;

let getInitJobs = (state: StateDataType.state) => state.renderConfig.init_jobs;

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

let getInitPipelineJobs = ({init_pipeline}, init_pipelines: init_pipelines, mapFunc) => {
  let init_pipelineItem: initPipeline =
    findFirst(
      init_pipelines,
      [@bs] (({name}: initPipeline) => _filterTargetName(name, init_pipeline))
    );
  init_pipelineItem.jobs |> ArraySystem.map(mapFunc)
};

let execJobs = (jobs: array(job), state: StateDataType.state) : state => {
  let mutableState = ref(state);
  let jobHandleMap = getJobHandleMap(mutableState^);
  jobs
  |> ArraySystem.forEach(
       ({name}: job) =>
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
     )
};