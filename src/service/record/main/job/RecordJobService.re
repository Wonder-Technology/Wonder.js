open StateDataMainType;

let create = () => {
  noWorkerInitJobList: [],
  noWorkerLoopJobList: [],
  noWorkerCustomInitJobHandleMap: WonderCommonlib.HashMapService.createEmpty(),
  noWorkerCustomLoopJobHandleMap: WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainInitTargetJobMap:
    WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainInitSourceJobMap:
    WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainInitRemovedDefaultJobMap:
    WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainLoopTargetJobMap:
    WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainLoopSourceJobMap:
    WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainLoopRemovedDefaultJobMap:
    WonderCommonlib.HashMapService.createEmpty(),
};