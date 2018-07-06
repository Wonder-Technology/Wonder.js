open StateDataMainType;

let create = () => {
  domEventDataListMap: WonderCommonlib.SparseMapService.createEmpty(),
  customGlobalEventListMap: WonderCommonlib.HashMapService.createEmpty(),
  customGameObjectEventListMap: WonderCommonlib.HashMapService.createEmpty(),
  mouseEventData: {
    lastX: None,
    lastY: None,
  },
};