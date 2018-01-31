open LogicJobConfigType;

let _unsafeGetLogicJobConfig = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|logic job config exist|j}, ~actual={j|not|j}),
              () => state.logicJobConfig |> assertExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  state.logicJobConfig |> Js.Option.getExn
};

let getInitPipelines = (state: StateDataType.state) =>
  _unsafeGetLogicJobConfig(state).init_pipelines;

let getInitJobs = (state: StateDataType.state) => _unsafeGetLogicJobConfig(state).init_jobs;

let getUpdatePipelines = (state: StateDataType.state) =>
  _unsafeGetLogicJobConfig(state).update_pipelines;

let getUpdateJobs = (state: StateDataType.state) => _unsafeGetLogicJobConfig(state).update_jobs;

let getLogicSetting = (state: StateDataType.state) =>
  _unsafeGetLogicJobConfig(state).logic_setting;

let _getExecutableJob = (jobs: array(job), {name: jobItemName}: jobItem) => {name: jobItemName};

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

let getUpdatePipelineExecutableJobs = ({update_pipeline}, update_pipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(update_pipeline, update_pipelines, jobs);