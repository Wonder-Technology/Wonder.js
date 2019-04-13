open StateDataMainType;

let getRecord = ({scriptRecord}) => scriptRecord;

let create = () => {
  index: 0,
  isScriptEventFunctionEnable: true,
  isActiveMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  scriptEventFunctionDataMap:
    WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  scriptAttributeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
};

let deepCopyForRestore = state => {
  let {index, gameObjectMap, isActiveMap, disposedIndexArray} as record =
    state |> getRecord;

  {
    ...state,
    scriptRecord: {
      ...record,
      index,
      gameObjectMap:
        gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
      isActiveMap: isActiveMap |> WonderCommonlib.MutableSparseMapService.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy,
    },
  };
};