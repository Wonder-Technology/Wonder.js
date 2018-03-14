open MainStateDataType;

let _getAllNoWorkerJobs = (executableJobs, jobHandleMap, state: MainStateDataType.state) =>
  NoWorkerJobType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name, flags}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None => JobService.handleGetNoneJob(name, jobHandleMap)
             | Some(handleFunc) => list @ [(name, handleFunc(flags))]
             }
         ),
         []
       )
  );

let _getNoWorkerInitJobList = (state: MainStateDataType.state) =>
  state.jobRecord.noWorkerInitJobList;

let _getNoWorkerLoopJobList = (state: MainStateDataType.state) =>
  state.jobRecord.noWorkerLoopJobList;

let execNoWorkerInitJobs = (state: MainStateDataType.state) : state =>
  state
  |> _getNoWorkerInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execNoWorkerLoopJobs = (state: MainStateDataType.state) : state =>
  state
  |> _getNoWorkerLoopJobList
  |> List.fold_left(
       (state, (_, handleFunc)) =>
         handleFunc(TimeControllerService.getElapsed(state.timeControllerRecord), state),
       state
     );

let init = (state: MainStateDataType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      _getAllNoWorkerJobs(
        OperateNoWorkerJobService.getInitPipelineExecutableJobs(
          OperateNoWorkerJobService.getSetting(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getInitPipelines(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getInitJobs(state.noWorkerJobRecord)
        ),
        NoWorkerJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    noWorkerLoopJobList:
      _getAllNoWorkerJobs(
        OperateNoWorkerJobService.getLoopPipelineExecutableJobs(
          OperateNoWorkerJobService.getSetting(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getLoopPipelines(state.noWorkerJobRecord),
          OperateNoWorkerJobService.getLoopJobs(state.noWorkerJobRecord)
        ),
        NoWorkerJobHandleSystem.createLoopJobHandleMap(),
        state
      )
  }
};

let addNoWorkerInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList:
      JobService.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getNoWorkerInitJobList(state)
      )
  }
};

let addNoWorkerLoopJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: MainStateDataType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerLoopJobList:
      JobService.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getNoWorkerLoopJobList(state)
      )
  }
};

let removeNoWorkerInitJob = (targetJobName: string, state: MainStateDataType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerInitJobList: JobService.removeJob(targetJobName, _getNoWorkerInitJobList(state))
  }
};

let removeNoWorkerLoopJob = (targetJobName: string, state: MainStateDataType.state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    noWorkerLoopJobList: JobService.removeJob(targetJobName, _getNoWorkerLoopJobList(state))
  }
};