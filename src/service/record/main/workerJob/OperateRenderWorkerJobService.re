open WorkerJobType;

let _unsafeGetWorkerJobConfig = (record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|render job config exist|j}, ~actual={j|not|j}),
              () => record |> assertExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  record |> OptionService.unsafeGet
};

let getSetting = (record) => _unsafeGetWorkerJobConfig(record).setting;

let _getRenderWorkerPipelineJobs = (workerPipeline, workerPipelines) =>
  JobConfigService.unsafeFindFirst(
    workerPipelines,
    workerPipeline,
    ({name}) => JobConfigService.filterTargetName(name, workerPipeline)
  ).
    jobs.
    render;

let getRenderWorkerPipelineJobs = (record) => {
  let {setting, workerPipelines} = _unsafeGetWorkerJobConfig(record);
  _getRenderWorkerPipelineJobs(setting.workerPipeline, workerPipelines)
};

let getWorkerJobs = (record) => _unsafeGetWorkerJobConfig(record).workerJobs;

let _getExecutableWorkerJob = (jobs, jobItemName) =>
  JobConfigService.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: job) => JobConfigService.filterTargetName(jobName, jobItemName)
  );

let _buildWorkerStreamFuncArr =
    ((jobHandleMap, pipelineSubJobs, stateData, jobs), getJobHandleFunc) =>
  pipelineSubJobs
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (streamArr, {name: jobName} as job) => {
           let {flags} = _getExecutableWorkerJob(jobs, jobName);
           let handleFunc = getJobHandleFunc(jobName, jobHandleMap);
           streamArr |> ArrayService.push(handleFunc(flags))
         }
       ),
       [||]
     );

let getRenderWorkerJobStreamArr =
    (pipelineJobs, workerJobs, jobHandleMap, stateData, getJobHandleFunc) =>
  pipelineJobs
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (streamArr, pipelineSubJobs) =>
           streamArr
           |> ArrayService.push(
                _buildWorkerStreamFuncArr(
                  (jobHandleMap, pipelineSubJobs, stateData, workerJobs),
                  getJobHandleFunc
                )
                |> MostUtils.concatStreamFuncArray(stateData)
              )
       ),
       [||]
     );