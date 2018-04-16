open StateDataMainType;

open WorkerJobType;

open JobType;

let _getExecutableJob = (jobs, jobItemName) =>
  JobConfigService.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: job) => JobConfigService.filterTargetName(jobName, jobItemName)
  );

let rec _findAllCustomJobHandles = (subJobName, workerCustomMainInitTargetJobMap, handleList) =>
  switch (workerCustomMainInitTargetJobMap |> WonderCommonlib.HashMapService.get(subJobName)) {
  | None => handleList
  | Some((customJobName, action, handleFunc)) =>
    (
      switch action {
      | BEFORE => [handleFunc, ...handleList]
      | AFTER => handleList @ [handleFunc]
      }
    )
    |> _findAllCustomJobHandles(customJobName, workerCustomMainInitTargetJobMap)
  };

let _buildCustomStreamArr = (customJobHandleList, stateData) =>
  customJobHandleList
  |> List.fold_left(
       (streamArr, customHandle) =>
         streamArr
         |> ArrayService.push(
              MostUtils.callFunc(
                () => {
                  customHandle(stateData);
                  None
                }
              )
            ),
       [||]
     );

let _AddCustomJobHandleToStreamArr = (subJobName, state, stateData, streamArr) =>
  switch (
    _findAllCustomJobHandles(subJobName, state.jobRecord.workerCustomMainInitTargetJobMap, [])
  ) {
  | list when list |> List.length === 0 => streamArr
  | list => streamArr |> Js.Array.concat(_buildCustomStreamArr(list, stateData))
  };

let _buildStreamArr =
    (
      (
        jobHandleMap,
        pipelineJobs: array(mainInitPipelineJob),
        pipelineSubJobs: array(mainInitPipelineSubJob),
        stateData,
        jobs
      ),
      findFunc,
      getJobHandleFunc,
      state
    ) =>
  pipelineSubJobs
  |> Js.Array.filter(
       ({name}: mainInitPipelineSubJob) =>
         ! (
           state.jobRecord.workerCustomMainInitRemovedDefaultJobMap
           |> WonderCommonlib.HashMapService.has(name)
         )
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (streamArr, {name: subJobName}: mainInitPipelineSubJob) =>
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
             streamArr
             |> ArrayService.push(handleFunc(flags, stateData))
             |> _AddCustomJobHandleToStreamArr(subJobName, state, stateData)
           | Some(jobRecord) =>
             streamArr
             |> ArrayService.push(
                  findFunc(
                    (jobRecord, pipelineJobs, jobHandleMap, jobs, stateData),
                    getJobHandleFunc,
                    state
                  )
                )
             |> _AddCustomJobHandleToStreamArr(subJobName, state, stateData)
           }
       ),
       [||]
     );

let rec _find =
        (
          (
            {link, jobs: pipelineSubJobs}: mainInitPipelineJob,
            pipelineJobs,
            jobHandleMap,
            mainInitJobs,
            stateData
          ),
          getJobHandleFunc,
          state
        ) =>
  switch link {
  | "merge" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainInitJobs),
      _find,
      getJobHandleFunc,
      state
    )
    |> Most.mergeArray
  | "concat" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainInitJobs),
      _find,
      getJobHandleFunc,
      state
    )
    |> MostUtils.concatArray
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_find",
        ~description={j|invalid link: $link|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
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
                     ({name}: mainInitPipelineJob) =>
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
    ({name}: mainInitPipelineJob) => JobConfigService.filterTargetName(name, jobName)
  )
};

let getMainInitJobStream = (jobHandleMap, stateData, getJobHandleFunc, {workerJobRecord} as state) => {
  let {setting, mainInitPipelines, mainInitJobs} = workerJobRecord |> OptionService.unsafeGet;
  let {jobs}: mainInitPipeline =
    JobConfigService.unsafeFindFirst(
      mainInitPipelines,
      setting.mainInitPipeline,
      ({name}) => JobConfigService.filterTargetName(name, setting.mainInitPipeline)
    );
  _find(
    (_findFrameJob(jobs), jobs, jobHandleMap, mainInitJobs, stateData),
    getJobHandleFunc,
    state
  )
};