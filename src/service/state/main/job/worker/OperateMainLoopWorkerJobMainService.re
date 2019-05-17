open StateDataMainType;

open WorkerJobType;

open JobType;

let _buildStreamArr =
    (
      (
        jobHandleMap,
        pipelineJobs: array(mainLoopPipelineJob),
        pipelineSubJobs: array(mainLoopPipelineSubJob),
        stateData,
        jobs,
      ),
      findFunc,
      getJobHandleFunc,
      state,
    ) =>
  pipelineSubJobs
  |> Js.Array.filter(({name}: mainLoopPipelineSubJob) =>
       !(
         state.jobRecord.workerCustomMainLoopRemovedDefaultJobMap
         |> WonderCommonlib.MutableHashMapService.has(name)
       )
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. streamArr, {name: subJobName}: mainLoopPipelineSubJob) =>
         switch (
           JobConfigService.findFirst(pipelineJobs, subJobName, ({name}) =>
             JobConfigService.filterTargetName(name, subJobName)
           )
         ) {
         | None =>
           let {flags} =
             OperateMainWorkerJobMainService.getExecutableJob(
               jobs,
               subJobName,
             );
           let handleFunc = getJobHandleFunc(subJobName, jobHandleMap);
           streamArr
           |> OperateMainWorkerJobMainService.addCustomJobHandleToStreamArr(
                subJobName,
                [|handleFunc(flags, stateData)|],
                state.jobRecord.workerCustomMainLoopTargetJobMap,
                stateData,
              );
         | Some(jobRecord) =>
           streamArr
           |> ArrayService.push(
                findFunc(
                  (jobRecord, pipelineJobs, jobHandleMap, jobs, stateData),
                  getJobHandleFunc,
                  state,
                ),
              )
           |> OperateMainWorkerJobMainService.addCustomJobHandleToStreamArr(
                subJobName,
                [||],
                state.jobRecord.workerCustomMainLoopTargetJobMap,
                stateData,
              )
         },
       [||],
     );

let rec _find =
        (
          (
            {link, jobs: pipelineSubJobs}: mainLoopPipelineJob,
            pipelineJobs,
            jobHandleMap,
            mainLoopJobs,
            stateData,
          ),
          getJobHandleFunc,
          state,
        ) =>
  switch (link) {
  | "merge" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainLoopJobs),
      _find,
      getJobHandleFunc,
      state,
    )
    |> WonderBsMost.Most.mergeArray
  | "concat" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainLoopJobs),
      _find,
      getJobHandleFunc,
      state,
    )
    |> MostUtils.concatArray
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_find",
        ~description={j|invalid link: $link|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _getFrameJobName = () => "frame";

let _findFrameJob = jobs => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|frame job only has one|j},
                ~actual={j|not|j},
              ),
              () =>
              jobs
              |> Js.Array.filter(({name}: mainLoopPipelineJob) =>
                   JobConfigService.filterTargetName(name, _getFrameJobName())
                 )
              |> Js.Array.length == 1
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let jobName = _getFrameJobName();
  JobConfigService.unsafeFindFirst(
    jobs, jobName, ({name}: mainLoopPipelineJob) =>
    JobConfigService.filterTargetName(name, jobName)
  );
};

let getMainLoopJobStream =
    (jobHandleMap, stateData, getJobHandleFunc, {workerJobRecord} as state) => {
  let {setting, mainLoopPipelines, mainLoopJobs} =
    workerJobRecord |> OptionService.unsafeGet;
  let {jobs}: mainLoopPipeline =
    JobConfigService.unsafeFindFirst(
      mainLoopPipelines, setting.mainLoopPipeline, ({name}) =>
      JobConfigService.filterTargetName(name, setting.mainLoopPipeline)
    );
  _find(
    (_findFrameJob(jobs), jobs, jobHandleMap, mainLoopJobs, stateData),
    getJobHandleFunc,
    state,
  );
};