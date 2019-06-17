open StateDataMainType;

open WorkerJobType;

open JobType;

let _buildStreamArr =
    (
      (
        jobHandleMap,
        pipelineJobs: array(mainInitPipelineJob),
        pipelineSubJobs: array(mainInitPipelineSubJob),
        stateData,
        jobs,
      ),
      findFunc,
      getJobHandleFunc,
      state,
    ) =>
  pipelineSubJobs
  |> Js.Array.filter(({name}: mainInitPipelineSubJob) =>
       !(
         state.jobRecord.workerCustomMainInitRemovedDefaultJobMap
         |> WonderCommonlib.MutableHashMapService.has(name)
       )
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. streamArr, {name: subJobName}: mainInitPipelineSubJob) =>
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
                state.jobRecord.workerCustomMainInitTargetJobMap,
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
                state.jobRecord.workerCustomMainInitTargetJobMap,
                stateData,
              )
         },
       [||],
     );

let rec _find =
        (
          (
            {link, jobs: pipelineSubJobs}: mainInitPipelineJob,
            pipelineJobs,
            jobHandleMap,
            mainInitJobs,
            stateData,
          ),
          getJobHandleFunc,
          state,
        ) =>
  switch (link) {
  | "merge" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainInitJobs),
      _find,
      getJobHandleFunc,
      state,
    )
    |> WonderBsMost.Most.mergeArray
  | "concat" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainInitJobs),
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
              |> Js.Array.filter(({name}: mainInitPipelineJob) =>
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
    jobs, jobName, ({name}: mainInitPipelineJob) =>
    JobConfigService.filterTargetName(name, jobName)
  );
};

let getMainInitJobStream =
    (jobHandleMap, stateData, getJobHandleFunc, {workerJobRecord} as state) => {
  let {setting, mainInitPipelines, mainInitJobs} =
    workerJobRecord |> OptionService.unsafeGet;
  let {jobs}: mainInitPipeline =
    JobConfigService.unsafeFindFirst(
      mainInitPipelines, setting.mainInitPipeline, ({name}) =>
      JobConfigService.filterTargetName(name, setting.mainInitPipeline)
    );
  _find(
    (_findFrameJob(jobs), jobs, jobHandleMap, mainInitJobs, stateData),
    getJobHandleFunc,
    state,
  );
};