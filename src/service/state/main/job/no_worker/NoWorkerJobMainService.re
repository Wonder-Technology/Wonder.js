open StateDataMainType;

open JobType;

let _getAllNoWorkerJobs =
    (executableJobs, jobHandleMap, state: StateDataMainType.state) =>
  NoWorkerJobType.(
    executableJobs
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. list, {name, flags}: executableJob) =>
           switch (WonderCommonlib.HashMapService.get(name, jobHandleMap)) {
           | None => JobService.handleGetNoneJob(name, jobHandleMap)
           | Some(handleFunc) => list @ [(name, handleFunc(flags))]
           },
         [],
       )
  );

let _getNoWorkerInitJobList = (state: StateDataMainType.state) =>
  state.jobRecord.noWorkerInitJobList;

let _getNoWorkerLoopJobList = (state: StateDataMainType.state) =>
  state.jobRecord.noWorkerLoopJobList;

let execNoWorkerInitJobs = (state: StateDataMainType.state) : state =>
  state
  |> _getNoWorkerInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execNoWorkerLoopJobs = (state: StateDataMainType.state) : state =>
  state
  |> _getNoWorkerLoopJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let init =
    (
      (createInitJobHandleMapFunc, createLoopJobHandleMapFunc),
      state: StateDataMainType.state,
    ) => {
  let {noWorkerCustomInitJobHandleMap, noWorkerCustomLoopJobHandleMap} as jobRecord =
    state.jobRecord;

  {
    ...state,
    jobRecord: {
      ...jobRecord,
      noWorkerInitJobList:
        _getAllNoWorkerJobs(
          OperateNoWorkerJobService.getInitPipelineExecutableJobs(
            OperateNoWorkerJobService.getSetting(state.noWorkerJobRecord),
            OperateNoWorkerJobService.getInitPipelines(
              state.noWorkerJobRecord,
            ),
            OperateNoWorkerJobService.getInitJobs(state.noWorkerJobRecord),
          ),
          createInitJobHandleMapFunc()
          |> HandleJobService.concatJobHandleMaps(
               noWorkerCustomInitJobHandleMap,
             ),
          state,
        ),
      noWorkerLoopJobList:
        _getAllNoWorkerJobs(
          OperateNoWorkerJobService.getLoopPipelineExecutableJobs(
            OperateNoWorkerJobService.getSetting(state.noWorkerJobRecord),
            OperateNoWorkerJobService.getLoopPipelines(
              state.noWorkerJobRecord,
            ),
            OperateNoWorkerJobService.getLoopJobs(state.noWorkerJobRecord),
          ),
          createLoopJobHandleMapFunc()
          |> HandleJobService.concatJobHandleMaps(
               noWorkerCustomLoopJobHandleMap,
             ),
          state,
        ),
    },
  };
};

let registerNoWorkerInitJob =
    (jobName, handleFunc, state: StateDataMainType.state) => {
  let {noWorkerCustomInitJobHandleMap} as jobRecord = state.jobRecord;

  {
    ...state,
    jobRecord: {
      ...state.jobRecord,
      noWorkerCustomInitJobHandleMap:
        noWorkerCustomInitJobHandleMap
        |> WonderCommonlib.HashMapService.set(jobName, handleFunc),
    },
  };
};

let registerNoWorkerLoopJob =
    (jobName, handleFunc, state: StateDataMainType.state) => {
  let {noWorkerCustomLoopJobHandleMap} as jobRecord = state.jobRecord;

  {
    ...state,
    jobRecord: {
      ...state.jobRecord,
      noWorkerCustomLoopJobHandleMap:
        noWorkerCustomLoopJobHandleMap
        |> WonderCommonlib.HashMapService.set(jobName, handleFunc),
    },
  };
};

let addNoWorkerInitJob =
    (
      (targetJobName: string, afterJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state,
    ) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      JobService.addJob(
        (targetJobName, afterJobName, action, targetHandleFunc),
        _getNoWorkerInitJobList(state),
      ),
  },
};

let addNoWorkerLoopJob =
    (
      (targetJobName: string, afterJobName: string),
      action,
      targetHandleFunc,
      state: StateDataMainType.state,
    ) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerLoopJobList:
      JobService.addJob(
        (targetJobName, afterJobName, action, targetHandleFunc),
        _getNoWorkerLoopJobList(state),
      ),
  },
};

let removeNoWorkerInitJob =
    (targetJobName: string, state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      JobService.removeJob(targetJobName, _getNoWorkerInitJobList(state)),
  },
};

let removeNoWorkerLoopJob =
    (targetJobName: string, state: StateDataMainType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerLoopJobList:
      JobService.removeJob(targetJobName, _getNoWorkerLoopJobList(state)),
  },
};