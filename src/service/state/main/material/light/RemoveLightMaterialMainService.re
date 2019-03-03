open StateDataMainType;

open LightMaterialType;

let handleRemoveComponent = (gameObject, material, state) => {
  let materialRecord = state |> RecordLightMaterialMainService.getRecord;

  {
    ...state,
    lightMaterialRecord:
      Some(
        GroupLightMaterialService.removeGameObject(
          gameObject,
          material,
          materialRecord,
        ),
      ),
  };
};

let handleBatchRemoveComponent = (materialDataMap, state) => {
  ...state,
  lightMaterialRecord:
    Some(
      materialDataMap
      |> WonderCommonlib.MutableSparseMapService.reduceiValid(
           (. materialRecord, gameObjectArr, material) =>
             GroupLightMaterialService.batchRemoveGameObjects(
               gameObjectArr,
               material,
               materialRecord,
             ),
           state |> RecordLightMaterialMainService.getRecord,
         ),
    ),
};