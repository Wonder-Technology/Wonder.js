open StateDataType;

let _getAllNoWorkerJobs = (executableJobs, jobHandleMap, state: StateDataType.state) =>
  NoWorkerJobConfigType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name, flags}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None => JobSystem.handleGetNoneJob(name, jobHandleMap)
             | Some(handleFunc) => list @ [(name, handleFunc(flags))]
             }
         ),
         []
       )
  );

let _getNoWorkerInitJobList = (state: StateDataType.state) => state.jobData.noWorkerInitJobList;

let _getNoWorkerLoopJobList = (state: StateDataType.state) => state.jobData.noWorkerLoopJobList;

let execNoWorkerInitJobs = (state: StateDataType.state) : state =>
  state
  |> _getNoWorkerInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execNoWorkerLoopJobs = (elapsed: float, state: StateDataType.state) : state =>
  state
  |> _getNoWorkerLoopJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(elapsed, state), state);

let init = (state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    noWorkerInitJobList:
      _getAllNoWorkerJobs(
        NoWorkerJobConfigSystem.getInitPipelineExecutableJobs(
          NoWorkerJobConfigSystem.getSetting(state),
          NoWorkerJobConfigSystem.getInitPipelines(state),
          NoWorkerJobConfigSystem.getInitJobs(state)
        ),
        NoWorkerJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    noWorkerLoopJobList:
      _getAllNoWorkerJobs(
        NoWorkerJobConfigSystem.getLoopPipelineExecutableJobs(
          NoWorkerJobConfigSystem.getSetting(state),
          NoWorkerJobConfigSystem.getLoopPipelines(state),
          NoWorkerJobConfigSystem.getLoopJobs(state)
        ),
        NoWorkerJobHandleSystem.createLoopJobHandleMap(),
        state
      )
  }
};
/*
 let addNoWorkerInitJob =
     (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
   ...state,
   jobData: {
     ...state.jobData,
     noWorkerInitJobList:
       JobSystem.addJob(
         (targetJobName, afterJobName, targetHandleFunc),
         _getNoWorkerInitJobList(state)
       )
   }
 };

 let addNoWorkerLoopJob =
     (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
   ...state,
   jobData: {
     ...state.jobData,
     noWorkerLoopJobList:
       JobSystem.addJob(
         (targetJobName, afterJobName, targetHandleFunc),
         _getNoWorkerLoopJobList(state)
       )
   }
 };

 let removeNoWorkerInitJob = (targetJobName: string, state: StateDataType.state) => {
   ...state,
   jobData: {
     ...state.jobData,
     noWorkerInitJobList: JobSystem.removeJob(targetJobName, _getNoWorkerInitJobList(state))
   }
 };

 let removeNoWorkerLoopJob = (targetJobName: string, state: StateDataType.state) => {
   ...state,
   jobData: {
     ...state.jobData,
     noWorkerLoopJobList: JobSystem.removeJob(targetJobName, _getNoWorkerLoopJobList(state))
   }
 }; */