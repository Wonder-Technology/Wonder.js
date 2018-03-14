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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  record |> Js.Option.getExn
};

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
  |> WonderCommonlib.ArraySystem.reduceOneParam(
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

/* TODO refactor */
let getMainInitJobStream = (jobHandleMap, stateData, record, getJobHandleFunc) => {
  let {setting, mainInitPipelines, mainInitJobs} = record |> OptionService.unsafeGet;
  /* TODO refactor */
  let {jobs}: mainInitPipeline =
    JobConfigService.unsafeFindFirst(
      mainInitPipelines,
      setting.mainInitPipeline,
      ({name}) => JobConfigService.filterTargetName(name, setting.mainInitPipeline)
    );
  /* TODO check: frame job should only has one */
  let jobName = "frame";
  _find(
    (
      JobConfigService.unsafeFindFirst(
        jobs,
        jobName,
        ({name}: mainInitPipelineJob) => JobConfigService.filterTargetName(name, jobName)
      ),
      jobs,
      jobHandleMap,
      mainInitJobs,
      stateData
    ),
    getJobHandleFunc
  )
};

/* TODO refactor: move out? */
/* let _buildWorkerStreamArr = (jobHandleMap, pipelineJobs, stateData, jobs) =>
   pipelineJobs
   |> WonderCommonlib.ArraySystem.reduceOneParam(
        [@bs]
        (
          (streamArr, {name: jobName}) => {
            let {flags} = _getExecutableJob(jobs, subJobName);
            let handleFunc = WorkerJobHandleSystem.getJobHandle(jobName, jobHandleMap);
            streamArr |> ArrayService.push(handleFunc(flags, stateData))
          }
        ),
        [||]
      ); */
let getSetting = (record) => _unsafeGetWorkerJobConfig(record).setting;

let _getWorkerPipelineJobs = (record) => {
  let {setting, workerPipelines} = _unsafeGetWorkerJobConfig(record);
  /* _getPipeline(setting.workerPipeline, workerPipelines).jobs */
  JobConfigService.unsafeFindFirst(
    workerPipelines,
    setting.workerPipeline,
    ({name}) => JobConfigService.filterTargetName(name, setting.workerPipeline)
  ).
    jobs
};

let getRenderWorkerPipelineJobs = (record) => _getWorkerPipelineJobs(record).render;

let getWorkerJobs = (record) => _unsafeGetWorkerJobConfig(record).workerJobs;

let _getExecutableWorkerJob = (jobs, jobItemName) =>
  JobConfigService.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: RenderWorkerStateDataType.job) =>
      JobConfigService.filterTargetName(jobName, jobItemName)
  );

let _buildWorkerStreamFuncArr = ((jobHandleMap, pipelineJobs, stateData, jobs), getJobHandleFunc) =>
  RenderWorkerStateDataType.(
    pipelineJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (streamArr, {name: jobName}) => {
             let {flags} = _getExecutableWorkerJob(jobs, jobName);
             let handleFunc = getJobHandleFunc(jobName, jobHandleMap);
             streamArr |> ArrayService.push(handleFunc(flags))
           }
         ),
         [||]
       )
  );

let getRenderWorkerJobStreamArr =
    (pipelineJobs, workerJobs, jobHandleMap, stateData, getJobHandleFunc) => {
  /* let {setting, workerPipelines, workerJobs} = _unsafeGetWorkerJobConfig(state);
     let {jobs} = _getPipeline(setting.worker_pipeline, workerPipelines); */
  /* let state = StateRenderService.getState(stateData); */
  /* let workerJobs = StateRenderService.getJobs(state); */
  /* StateRenderService.getPipelineJobs(state) */
  pipelineJobs
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (streamArr, jobs) =>
           streamArr
           |> ArrayService.push(
                _buildWorkerStreamFuncArr(
                  (jobHandleMap, jobs, stateData, workerJobs),
                  getJobHandleFunc
                )
                |> MostUtils.concatStreamFuncArray(stateData)
              )
       ),
       [||]
     )
};