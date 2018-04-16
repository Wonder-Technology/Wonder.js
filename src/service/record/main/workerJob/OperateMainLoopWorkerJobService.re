/* TODO duplicate with OperateMainInitWorkerJobMainService */
open WorkerJobType;

let _getExecutableJob = (jobs, jobItemName) =>
  JobConfigService.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: job) => JobConfigService.filterTargetName(jobName, jobItemName)
  );

let _buildStreamArr =
    (
      (
        jobHandleMap,
        pipelineJobs: array(mainLoopPipelineJob),
        pipelineSubJobs: array(mainLoopPipelineSubJob),
        stateData,
        jobs
      ),
      findFunc,
      getJobHandleFunc
    ) =>
  pipelineSubJobs
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (streamArr, {name: subJobName}: mainLoopPipelineSubJob) =>
           streamArr
           |> ArrayService.push(
                switch (
                  JobConfigService.findFirst(
                    pipelineJobs,
                    subJobName,
                    ({name}) => JobConfigService.filterTargetName(name, subJobName)
                  )
                ) {
                | None =>
                  let {flags} = _getExecutableJob(jobs, subJobName);
                  let handleFunc = getJobHandleFunc(subJobName, jobHandleMap);
                  handleFunc(flags, stateData)
                | Some(jobRecord) =>
                  findFunc(
                    (jobRecord, pipelineJobs, jobHandleMap, jobs, stateData),
                    getJobHandleFunc
                  )
                }
              )
       ),
       [||]
     );

let rec _find =
        (
          (
            {link, jobs: pipelineSubJobs}: mainLoopPipelineJob,
            pipelineJobs,
            jobHandleMap,
            mainLoopJobs,
            stateData
          ),
          getJobHandleFunc
        ) =>
  switch link {
  | "merge" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainLoopJobs),
      _find,
      getJobHandleFunc
    )
    |> Most.mergeArray
  | "concat" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainLoopJobs),
      _find,
      getJobHandleFunc
    )
    |> MostUtils.concatArray
  };

let _getFrameJobName = () => "frame";

let _findFrameJob = (jobs) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|frame job only has one|j}, ~actual={j|not|j}),
              () =>
                jobs
                |> Js.Array.filter(
                     ({name}: mainLoopPipelineJob) =>
                       JobConfigService.filterTargetName(name, _getFrameJobName())
                   )
                |> Js.Array.length == 1
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let jobName = _getFrameJobName();
  JobConfigService.unsafeFindFirst(
    jobs,
    jobName,
    ({name}: mainLoopPipelineJob) => JobConfigService.filterTargetName(name, jobName)
  )
};

let getMainLoopJobStream = (jobHandleMap, stateData, record, getJobHandleFunc) => {
  let {setting, mainLoopPipelines, mainLoopJobs} = record |> OptionService.unsafeGet;
  let {jobs}: mainLoopPipeline =
    JobConfigService.unsafeFindFirst(
      mainLoopPipelines,
      setting.mainLoopPipeline,
      ({name}) => JobConfigService.filterTargetName(name, setting.mainLoopPipeline)
    );
  _find((_findFrameJob(jobs), jobs, jobHandleMap, mainLoopJobs, stateData), getJobHandleFunc)
};