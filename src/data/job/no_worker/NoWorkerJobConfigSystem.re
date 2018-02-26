open NoWorkerJobConfigType;

let _unsafeGetNoWorkerJobConfig = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|logic job config exist|j}, ~actual={j|not|j}),
              () => state.noWorkerJobConfig |> assertExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  state.noWorkerJobConfig |> Js.Option.getExn
};

let getInitPipelines = (state: StateDataType.state) =>
  _unsafeGetNoWorkerJobConfig(state).initPipelines;

let getInitJobs = (state: StateDataType.state) => _unsafeGetNoWorkerJobConfig(state).initJobs;

let getLoopPipelines = (state: StateDataType.state) =>
  _unsafeGetNoWorkerJobConfig(state).loopPipelines;

let getLoopJobs = (state: StateDataType.state) => _unsafeGetNoWorkerJobConfig(state).loopJobs;

let getSetting = (state: StateDataType.state) => _unsafeGetNoWorkerJobConfig(state).setting;

let _getExecutableJob = (jobs: array(job), {name: pipelineJobName}: pipelineJob) => {
  let {flags}: job =
    JobConfigSystem.unsafeFindFirst(
      jobs,
      pipelineJobName,
      ({name: jobName}: job) => JobConfigSystem.filterTargetName(jobName, pipelineJobName)
    );
  {name: pipelineJobName, flags}
};

let _getPipelineExecutableJobs = (pipeline, pipelines, jobs: array(job)) => {
  let pipelineItem: pipeline =
    JobConfigSystem.unsafeFindFirst(
      pipelines,
      pipeline,
      ({name}: pipeline) => JobConfigSystem.filterTargetName(name, pipeline)
    );
  pipelineItem.jobs |> Js.Array.map(_getExecutableJob(jobs))
};

let getInitPipelineExecutableJobs = ({initPipeline}, initPipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(initPipeline, initPipelines, jobs);

let getLoopPipelineExecutableJobs = ({loopPipeline}, loopPipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(loopPipeline, loopPipelines, jobs);