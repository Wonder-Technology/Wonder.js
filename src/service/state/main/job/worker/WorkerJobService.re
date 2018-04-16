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
  OperateMainLoopWorkerJobService.getMainLoopJobStream(
    createJobHandleMapFunc(),
    stateData,
    state.workerJobRecord,
    getJobHandleFunc
  );

let getRenderWorkerJobStreamArr =
    (
      pipelineJobs,
      workerJobs,
      (createJobHandleMapFunc, getJobHandleFunc),
      stateData: StateDataRenderWorkerType.renderWorkerStateData
    ) =>
  OperateRenderWorkerJobService.getRenderWorkerJobStreamArr(
    pipelineJobs,
    workerJobs,
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
      |> WonderCommonlib.HashMapService.set(
           sourceJobName,
           (targetJobName, action, targetHandleFunc)
         ),
    workerCustomMainInitSourceJobMap:
      state.jobRecord.workerCustomMainInitSourceJobMap
      |> WonderCommonlib.HashMapService.set(targetJobName, sourceJobName)
  }
};

let removeWorkerMainInitJob = (targetJobName: string, state) =>
  switch (
    state.jobRecord.workerCustomMainInitSourceJobMap
    |> WonderCommonlib.HashMapService.get(targetJobName)
  ) {
  | None => {
      ...state,
      jobRecord: {
        ...state.jobRecord,
        workerCustomMainInitRemovedDefaultJobMap:
          state.jobRecord.workerCustomMainInitRemovedDefaultJobMap
          |> WonderCommonlib.HashMapService.set(targetJobName, true)
      }
    }
  | Some(sourceJobName) => {
      ...state,
      jobRecord: {
        ...state.jobRecord,
        workerCustomMainInitTargetJobMap:
          state.jobRecord.workerCustomMainInitTargetJobMap
          |> Obj.magic
          |> WonderCommonlib.HashMapService.deleteVal(sourceJobName)
          |> Obj.magic
      }
    }
  };