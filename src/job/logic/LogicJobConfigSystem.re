open LogicJobConfigType;

/* TODO add requireCheck */
let _unsafeGetLogicJobConfig = (state: StateDataType.state) => state.logicJobConfig |> Js.Option.getExn;

let getInitPipelines = (state: StateDataType.state) => _unsafeGetLogicJobConfig(state).init_pipelines;

let getInitJobs = (state: StateDataType.state) => _unsafeGetLogicJobConfig(state).init_jobs;

let getUpdatePipelines = (state: StateDataType.state) =>
  _unsafeGetLogicJobConfig(state).update_pipelines;

let getUpdateJobs = (state: StateDataType.state) => _unsafeGetLogicJobConfig(state).update_jobs;

let getLogicSetting = (state: StateDataType.state) => _unsafeGetLogicJobConfig(state).logic_setting;

/* TODO duplicate */
let findFirst = (arr: array('a), func) =>
  arr
  |> ArraySystem.unsafeFind(func)
  |> WonderLog.Contract.ensureCheck(
       (first) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|find result|j}, ~actual={j|not|j}),
                 () => first |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let _filterTargetName = (name, targetName) => name == targetName;

let _getExecutableJob = (jobs: array(job), {name: jobItemName}: jobItem) => {
  /* let : job =
     findFirst(jobs, ({name: jobName}: job) => _filterTargetName(jobName, jobItemName)); */
  name: jobItemName
};

let _getPipelineExecutableJobs = (pipeline, pipelines, jobs: array(job)) => {
  let pipelineItem: pipeline =
    findFirst(pipelines, ({name}: pipeline) => _filterTargetName(name, pipeline));
  pipelineItem.jobs |> Js.Array.map(_getExecutableJob(jobs))
};

let getInitPipelineExecutableJobs = ({init_pipeline}, init_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(init_pipeline, init_pipelines, jobs);

let getUpdatePipelineExecutableJobs = ({update_pipeline}, update_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(update_pipeline, update_pipelines, jobs);