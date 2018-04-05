open NoWorkerJobType;

let _unsafeGetNoWorkerJobConfig = (record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|noWorker job config exist|j}, ~actual={j|not|j}),
              () => record |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  record |> OptionService.unsafeGet
};

let getInitPipelines = (record) => _unsafeGetNoWorkerJobConfig(record).initPipelines;

let getInitJobs = (record) => _unsafeGetNoWorkerJobConfig(record).initJobs;

let getLoopPipelines = (record) => _unsafeGetNoWorkerJobConfig(record).loopPipelines;

let getLoopJobs = (record) => _unsafeGetNoWorkerJobConfig(record).loopJobs;

let getSetting = (record) => _unsafeGetNoWorkerJobConfig(record).setting;

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