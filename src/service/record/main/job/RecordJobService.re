open StateDataMainType;

let create = () => {
  noWorkerInitJobList: [],
  noWorkerLoopJobList: [],
  noWorkerCustomInitJobHandleMap: WonderCommonlib.MutableHashMapService.createEmpty(),
  noWorkerCustomLoopJobHandleMap: WonderCommonlib.MutableHashMapService.createEmpty(),
  workerCustomMainInitTargetJobMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
  workerCustomMainInitSourceJobMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
  workerCustomMainInitRemovedDefaultJobMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
  workerCustomMainLoopTargetJobMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
  workerCustomMainLoopSourceJobMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
  workerCustomMainLoopRemovedDefaultJobMap:
    WonderCommonlib.MutableHashMapService.createEmpty(),
};