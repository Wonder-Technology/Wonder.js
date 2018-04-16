open StateDataMainType;

let create = () => {
  noWorkerInitJobList: [],
  noWorkerLoopJobList: [],
  workerCustomMainInitTargetJobMap: WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainInitSourceJobMap: WonderCommonlib.HashMapService.createEmpty(),
  workerCustomMainInitRemovedDefaultJobMap: WonderCommonlib.HashMapService.createEmpty()
};