open StateDataMainType;

let create = () => {
  domEventStreamSubscription: None,
  domEventDataListMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGlobalEventListMap: WonderCommonlib.HashMapService.createEmpty(),
  customGameObjectEventListMap: WonderCommonlib.HashMapService.createEmpty(),
  mouseEventData: {
    lastX: None,
    lastY: None,
  },
};