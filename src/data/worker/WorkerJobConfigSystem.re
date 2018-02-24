open WorkerJobConfigType;

let _unsafeGetWorkerJobConfig = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|render job config exist|j}, ~actual={j|not|j}),
              () => state.workerJobConfig |> assertExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  state.workerJobConfig |> Js.Option.getExn
};

/* let _getPipeline = (pipeline: string, pipelines) =>
   JobConfigSystem.unsafeFindFirst(
     pipelines,
     pipeline,
     ({name}) => JobConfigSystem.filterTargetName(name, pipeline)
   ); */
let _getExecutableJob = (jobs, jobItemName) =>
  JobConfigSystem.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: job) => JobConfigSystem.filterTargetName(jobName, jobItemName)
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
           |> ArraySystem.push(
                switch (
                  JobConfigSystem.findFirst(
                    pipelineJobs,
                    subJobName,
                    ({name}) => JobConfigSystem.filterTargetName(name, subJobName)
                  )
                ) {
                | None =>
                  let {flags} = _getExecutableJob(jobs, subJobName);
                  let handleFunc = getJobHandleFunc(subJobName, jobHandleMap);
                  handleFunc(flags, stateData)
                | Some(jobData) =>
                  findFunc(
                    (jobData, pipelineJobs, jobHandleMap, jobs, stateData),
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
let getMainInitJobStream = (jobHandleMap, stateData, state: StateDataType.state, getJobHandleFunc) => {
  let {workerSetting, mainInitPipelines, mainInitJobs} = _unsafeGetWorkerJobConfig(state);
  /* TODO refactor */
  let {jobs}: mainInitPipeline =
    JobConfigSystem.unsafeFindFirst(
      mainInitPipelines,
      workerSetting.mainInitPipeline,
      ({name}) => JobConfigSystem.filterTargetName(name, workerSetting.mainInitPipeline)
    );
  /* TODO check: frame job should only has one */
  let jobName = "frame";
  _find(
    (
      JobConfigSystem.unsafeFindFirst(
        jobs,
        jobName,
        ({name}: mainInitPipelineJob) => JobConfigSystem.filterTargetName(name, jobName)
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
            streamArr |> ArraySystem.push(handleFunc(flags, stateData))
          }
        ),
        [||]
      ); */
let getWorkerSetting = (state) => _unsafeGetWorkerJobConfig(state).workerSetting;

let _getWorkerPipelineJobs = (state) => {
  let {workerSetting, workerPipelines} = _unsafeGetWorkerJobConfig(state);
  /* _getPipeline(workerSetting.workerPipeline, workerPipelines).jobs */
  JobConfigSystem.unsafeFindFirst(
    workerPipelines,
    workerSetting.workerPipeline,
    ({name}) => JobConfigSystem.filterTargetName(name, workerSetting.workerPipeline)
  ).
    jobs
};

let getRenderWorkerPipelineJobs = (state) => _getWorkerPipelineJobs(state).render;

let getWorkerJobs = (state) => _unsafeGetWorkerJobConfig(state).workerJobs;

let _getExecutableWorkerJob = (jobs, jobItemName) =>
  JobConfigSystem.unsafeFindFirst(
    jobs,
    jobItemName,
    ({name: jobName}: RenderWorkerStateDataType.job) =>
      JobConfigSystem.filterTargetName(jobName, jobItemName)
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
             streamArr |> ArraySystem.push(handleFunc(flags))
           }
         ),
         [||]
       )
  );


let getRenderWorkerJobStreamArr = (
 pipelineJobs, workerJobs,
 
jobHandleMap, stateData, getJobHandleFunc) => {
  /* let {workerSetting, workerPipelines, workerJobs} = _unsafeGetWorkerJobConfig(state);
     let {jobs} = _getPipeline(workerSetting.worker_pipeline, workerPipelines); */
  let state = RenderWorkerStateSystem.getState(stateData);
  /* let workerJobs = RenderWorkerStateSystem.getJobs(state); */
  /* RenderWorkerStateSystem.getPipelineJobs(state) */
  pipelineJobs
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (streamArr, jobs) =>
           streamArr
           |> ArraySystem.push(
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

/* TODO refactor: duplicate */
let _throwJobFlagsShouldBeDefined = () =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="throwJobFlagsShouldBeDefined",
      ~description={j|jobFlags should be defined|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j}
    )
  );

/* TODO refactor: move out? */
let unsafeGetFlags = (flags) =>
  switch flags {
  | None => _throwJobFlagsShouldBeDefined()
  | Some(flags) => flags
  };