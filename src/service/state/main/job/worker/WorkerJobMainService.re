open StateDataMainType;

open JobType;

let getMainInitJobStream =
    (stateData, (createJobHandleMapFunc, getJobHandleFunc), state: StateDataMainType.state) =>
  OperateMainInitWorkerJobMainService.getMainInitJobStream(
    createJobHandleMapFunc(),
    stateData,
    getJobHandleFunc,
    state
  );

let getMainLoopJobStream =
    (stateData, (createJobHandleMapFunc, getJobHandleFunc), state: StateDataMainType.state) =>
  OperateMainLoopWorkerJobMainService.getMainLoopJobStream(
    createJobHandleMapFunc(),
    stateData,
    getJobHandleFunc,
    state
  );

let getRenderWorkerJobStreamArr =
    (
      pipelineJobs,
      workerJobs,
      (createJobHandleMapFunc, getJobHandleFunc),
      stateData: StateDataRenderWorkerType.renderWorkerStateData
    ) =>
  OperateRenderWorkerJobService.getRenderWorkerJobStreamArr(
    (pipelineJobs, workerJobs),
    createJobHandleMapFunc(),
    stateData,
    getJobHandleFunc
  );

let addWorkerMainInitJob =
    ((targetJobName: string, sourceJobName: string), action, targetHandleFunc, state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    workerCustomMainInitTargetJobMap:
      state.jobRecord.workerCustomMainInitTargetJobMap
      |> WonderCommonlib.MutableHashMapService.set(
           sourceJobName,
           (targetJobName, action, targetHandleFunc)
         ),
    workerCustomMainInitSourceJobMap:
      state.jobRecord.workerCustomMainInitSourceJobMap
      |> WonderCommonlib.MutableHashMapService.set(targetJobName, sourceJobName)
  }
};

let removeWorkerMainInitJob = (targetJobName: string, state) =>
  switch (
    state.jobRecord.workerCustomMainInitSourceJobMap
    |> WonderCommonlib.MutableHashMapService.get(targetJobName)
  ) {
  | None => {
      ...state,
      jobRecord: {
        ...state.jobRecord,
        workerCustomMainInitRemovedDefaultJobMap:
          state.jobRecord.workerCustomMainInitRemovedDefaultJobMap
          |> WonderCommonlib.MutableHashMapService.set(targetJobName, true)
      }
    }
  | Some(sourceJobName) => {
      ...state,
      jobRecord: {
        ...state.jobRecord,
        workerCustomMainInitTargetJobMap:
          state.jobRecord.workerCustomMainInitTargetJobMap
          |> Obj.magic
          |> WonderCommonlib.MutableHashMapService.deleteVal(sourceJobName)
          |> Obj.magic
      }
    }
  };

let addWorkerMainLoopJob =
    ((targetJobName: string, sourceJobName: string), action, targetHandleFunc, state) => {
  ...state,
  jobRecord: {
    ...state.jobRecord,
    workerCustomMainLoopTargetJobMap:
      state.jobRecord.workerCustomMainLoopTargetJobMap
      |> WonderCommonlib.MutableHashMapService.set(
           sourceJobName,
           (targetJobName, action, targetHandleFunc)
         ),
    workerCustomMainLoopSourceJobMap:
      state.jobRecord.workerCustomMainLoopSourceJobMap
      |> WonderCommonlib.MutableHashMapService.set(targetJobName, sourceJobName)
  }
};

let removeWorkerMainLoopJob = (targetJobName: string, state) =>
  switch (
    state.jobRecord.workerCustomMainLoopSourceJobMap
    |> WonderCommonlib.MutableHashMapService.get(targetJobName)
  ) {
  | None => {
      ...state,
      jobRecord: {
        ...state.jobRecord,
        workerCustomMainLoopRemovedDefaultJobMap:
          state.jobRecord.workerCustomMainLoopRemovedDefaultJobMap
          |> WonderCommonlib.MutableHashMapService.set(targetJobName, true)
      }
    }
  | Some(sourceJobName) => {
      ...state,
      jobRecord: {
        ...state.jobRecord,
        workerCustomMainLoopTargetJobMap:
          state.jobRecord.workerCustomMainLoopTargetJobMap
          |> Obj.magic
          |> WonderCommonlib.MutableHashMapService.deleteVal(sourceJobName)
          |> Obj.magic
      }
    }
  };