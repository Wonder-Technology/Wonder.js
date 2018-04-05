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
        pipelineJobs: array(mainInitPipelineJob),
        pipelineSubJobs: array(mainInitPipelineSubJob),
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
         (streamArr, {name: subJobName}: mainInitPipelineSubJob) =>
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
          ({link, jobs: pipelineSubJobs}, pipelineJobs, jobHandleMap, mainInitJobs, stateData),
          getJobHandleFunc
        ) =>
  switch link {
  | "merge" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainInitJobs),
      _find,
      getJobHandleFunc
    )
    |> Most.mergeArray
  | "concat" =>
    _buildStreamArr(
      (jobHandleMap, pipelineJobs, pipelineSubJobs, stateData, mainInitJobs),
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
                     ({name}: mainInitPipelineJob) =>
                       JobConfigService.filterTargetName(name, _getFrameJobName())
                   )
                |> Js.Array.length == 1
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let jobName = _getFrameJobName();
  JobConfigService.unsafeFindFirst(
    jobs,
    jobName,
    ({name}: mainInitPipelineJob) => JobConfigService.filterTargetName(name, jobName)
  )
};

let getMainInitJobStream = (jobHandleMap, stateData, record, getJobHandleFunc) => {
  let {setting, mainInitPipelines, mainInitJobs} = record |> OptionService.unsafeGet;
  let {jobs}: mainInitPipeline =
    JobConfigService.unsafeFindFirst(
      mainInitPipelines,
      setting.mainInitPipeline,
      ({name}) => JobConfigService.filterTargetName(name, setting.mainInitPipeline)
    );
  _find((_findFrameJob(jobs), jobs, jobHandleMap, mainInitJobs, stateData), getJobHandleFunc)
};