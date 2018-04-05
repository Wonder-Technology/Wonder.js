open StateDataMainType;

let isSupportInstance = (state: StateDataMainType.state) =>
  JudgeInstanceService.isSupportInstance(
    OperateSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );

let isSourceIntance = (materialIndex, gameObjectMap, gameObjectRecord) =>
  gameObjectRecord
  |> HasComponentGameObjectService.hasSourceInstanceComponent(
       GameObjectMapService.unsafeGetGameObject(materialIndex, gameObjectMap),
       gameObjectRecord
     );

let buildMap = (index, gameObjectMap, gameObjectRecord) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (map, materialIndex: int) =>
           map
           |> WonderCommonlib.SparseMapService.set(
                materialIndex,
                isSourceIntance(materialIndex, gameObjectMap, gameObjectRecord)
              )
       ),
       WonderCommonlib.SparseMapService.createEmpty()
     );