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

let _deepCopyDomEventArrMap = domEventArrMap =>
  domEventArrMap
  |> SparseMapService.copy
  |> Js.Array.map(arr => arr |> Js.Array.copy);

let _deepCopyCustomGlobalEventArrMap = customGlobalEventArrMap =>
  customGlobalEventArrMap
  |> Js.Dict.map((. arr) => arr |> SparseMapService.copy);

let _deepCopyCustomGameObjectEventArrMap = customGameObjectEventArrMap =>
  /* let copiedMap = customGameObjectEventArrMap |> HashMapService.copy; */
  customGameObjectEventArrMap
  |> Js.Dict.map((. eventArrMap) =>
       eventArrMap
       |> SparseMapService.copy
       |> Js.Array.map(arr => arr |> Js.Array.copy)
     );

let deepCopyForRestore = ({eventRecord} as state) => {
  let {
    domEventStreamSubscription,
    domEventDataArrMap,
    customGlobalEventArrMap,
    customGameObjectEventArrMap,
    mouseEventData,
  } = eventRecord;
  {
    ...state,
    eventRecord: {
      ...eventRecord,
      domEventDataArrMap: domEventDataArrMap |> _deepCopyDomEventArrMap,
      customGlobalEventArrMap:
        customGlobalEventArrMap |> _deepCopyCustomGlobalEventArrMap,
      customGameObjectEventArrMap:
        customGameObjectEventArrMap |> _deepCopyCustomGameObjectEventArrMap,
      mouseEventData: {
        lastX: None,
        lastY: None,
      },
    },
  };
};