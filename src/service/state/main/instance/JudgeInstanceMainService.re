open MainStateDataType;

let isSupportInstance = (state: MainStateDataType.state) =>
  JudgeInstanceService.isSupportInstance(
    OperateSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );

/* let isSourceInstance = (uid, gameObjectRecord) =>
   HasComponentGameObjectService.hasSourceInstanceComponent(uid, gameObjectRecord); */
let isSourceIntance = (materialIndex, gameObjectMap, gameObjectRecord) =>
  gameObjectRecord
  |> JudgeInstanceMainService.isSourceInstance(
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
                isSourceIntance(materialIndex, gameObjectMap, gameObjectRecord)
              )
       ),
       WonderCommonlib.SparseMapService.createEmpty()
     );