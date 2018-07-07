open StateDataMainType;

let create = () => {
  domEventStreamSubscription: None,
  domEventDataArrMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGlobalEventArrMap: WonderCommonlib.HashMapService.createEmpty(),
  customGameObjectEventArrMap: WonderCommonlib.HashMapService.createEmpty(),
  mouseEventData: {
    lastX: None,
    lastY: None,
  },
};