open StateDataMainType;

open GeometryType;

let handleRemoveComponent = (gameObject, geometry: geometry, state) => {
  let geometryRecord = state |> RecordGeometryMainService.getRecord;

  {
    ...state,
    geometryRecord:
      Some(
        GroupGeometryService.removeGameObject(
          gameObject,
          geometry,
          geometryRecord,
        ),
      ),
  };
};

let handleBatchRemoveComponent = (geometryDataMap, state) => {
  ...state,
  geometryRecord:
    Some(
      geometryDataMap
      |> WonderCommonlib.MutableSparseMapService.reduceiValid(
           (. geometryRecord, gameObjectArr, geometry) =>
             GroupGeometryService.batchRemoveGameObjects(
               gameObjectArr,
               geometry,
               geometryRecord,
             ),
           state |> RecordGeometryMainService.getRecord,
         ),
    ),
};