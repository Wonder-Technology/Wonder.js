open StateDataMainType;

let isSupportInstance = (state: StateDataMainType.state) =>
  JudgeInstanceService.isSupportInstance(
    OperateSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );

let isSourceInstance = (materialIndex, gameObjectMap, gameObjectRecord) =>
  gameObjectRecord
  |> HasComponentGameObjectService.hasSourceInstanceComponent(
       GameObjectMapService.unsafeGetGameObject(materialIndex, gameObjectMap)
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
                isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord)
              )
       ),
       WonderCommonlib.SparseMapService.createEmpty()
     );