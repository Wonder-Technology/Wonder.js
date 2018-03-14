open NoWorkerJobConfigType;

let _unsafeGetNoWorkerJobConfig = (state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|noWorker job config exist|j}, ~actual={j|not|j}),
              () => state.noWorkerJobConfig |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  state.noWorkerJobConfig |> Js.Option.getExn
};

let getInitPipelines = (state: MainStateDataType.state) =>
  _unsafeGetNoWorkerJobConfig(state).initPipelines;

let getInitJobs = (state: MainStateDataType.state) => _unsafeGetNoWorkerJobConfig(state).initJobs;

let getLoopPipelines = (state: MainStateDataType.state) =>
  _unsafeGetNoWorkerJobConfig(state).loopPipelines;

let getLoopJobs = (state: MainStateDataType.state) => _unsafeGetNoWorkerJobConfig(state).loopJobs;

let getSetting = (state: MainStateDataType.state) => _unsafeGetNoWorkerJobConfig(state).setting;

let _getExecutableJob = (jobs: array(job), {name: pipelineJobName}: pipelineJob) => {
  let {flags}: job =
    JobConfigService.unsafeFindFirst(
      jobs,
      pipelineJobName,
      ({name: jobName}: job) => JobConfigService.filterTargetName(jobName, pipelineJobName)
    );
  {name: pipelineJobName, flags}
};

let _getPipelineExecutableJobs = (pipeline, pipelines, jobs: array(job)) => {
  let pipelineItem: pipeline =
    JobConfigService.unsafeFindFirst(
      pipelines,
      pipeline,
      ({name}: pipeline) => JobConfigService.filterTargetName(name, pipeline)
    );
  pipelineItem.jobs |> Js.Array.map(_getExecutableJob(jobs))
};

let getInitPipelineExecutableJobs = ({initPipeline}, initPipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(initPipeline, initPipelines, jobs);

let getLoopPipelineExecutableJobs = ({loopPipeline}, loopPipelines, jobs: array(job)) =>
  _getPipelineExecutableJobs(loopPipeline, loopPipelines, jobs);