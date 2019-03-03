open StateDataMainType;

open BasicMaterialType;

let handleRemoveComponent = (gameObject, material, state) => {
  let materialRecord = state |> RecordBasicMaterialMainService.getRecord;

  {
    ...state,
    basicMaterialRecord:
      Some(
        GroupBasicMaterialService.removeGameObject(
          gameObject,
          material,
          materialRecord,
        ),
      ),
  };
};

let handleBatchRemoveComponent = (materialDataMap, state) => {
  ...state,
  basicMaterialRecord:
    Some(
      materialDataMap
      |> WonderCommonlib.MutableSparseMapService.reduceiValid(
           (. materialRecord, gameObjectArr, material) =>
             GroupBasicMaterialService.batchRemoveGameObjects(
               gameObjectArr,
               material,
               materialRecord,
             ),
           state |> RecordBasicMaterialMainService.getRecord,
         ),
    ),
};