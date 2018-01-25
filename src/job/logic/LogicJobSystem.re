open StateDataType;

let _getAllLogicJobs = (executableJobs, jobHandleMap, state: StateDataType.state) =>
  LogicJobConfigType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None => JobSystem.handleGetNoneJob(name, jobHandleMap)
             | Some(handleFunc) => list @ [(name, handleFunc)]
             }
         ),
         []
       )
  );

let _getLogicInitJobList = (state: StateDataType.state) => state.jobData.logicInitJobList;

let _getLogicUpdateJobList = (state: StateDataType.state) => state.jobData.logicUpdateJobList;

/* TODO refactor */
let execLogicInitJobs = (state: StateDataType.state) : state =>
  state
  |> _getLogicInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execLogicUpdateJobs = (elapsed: float, state: StateDataType.state) : state =>
  state
  |> _getLogicUpdateJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(elapsed, state), state);

let init = (state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    logicInitJobList:
      _getAllLogicJobs(
        LogicJobConfigSystem.getInitPipelineExecutableJobs(
          LogicJobConfigSystem.getLogicSetting(state),
          LogicJobConfigSystem.getInitPipelines(state),
          LogicJobConfigSystem.getInitJobs(state)
        ),
        LogicJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    logicUpdateJobList:
      _getAllLogicJobs(
        LogicJobConfigSystem.getUpdatePipelineExecutableJobs(
          LogicJobConfigSystem.getLogicSetting(state),
          LogicJobConfigSystem.getUpdatePipelines(state),
          LogicJobConfigSystem.getUpdateJobs(state)
        ),
        LogicJobHandleSystem.createUpdateJobHandleMap(),
        state
      )
  }
};

let addLogicInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    logicInitJobList:
      JobSystem.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getLogicInitJobList(state)
      )
  }
};

let addLogicUpdateJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    logicUpdateJobList:
      JobSystem.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getLogicUpdateJobList(state)
      )
  }
};

let removeLogicInitJob = (targetJobName: string, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    logicInitJobList: JobSystem.removeJob(targetJobName, _getLogicInitJobList(state))
  }
};

let removeLogicUpdateJob = (targetJobName: string, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    logicUpdateJobList: JobSystem.removeJob(targetJobName, _getLogicUpdateJobList(state))
  }
};