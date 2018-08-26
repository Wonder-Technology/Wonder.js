open StateDataMainType;

open GeometryType;

let _handleRemoveComponent = (geometry: geometry, geometryRecord) =>
  switch (GroupGeometryService.isGroupGeometry(geometry, geometryRecord)) {
  | false => geometryRecord
  | true => GroupGeometryService.decreaseGroupCount(geometry, geometryRecord)
  };

let handleRemoveComponent =
  (geometry: geometry, state) => {
    let geometryRecord = state |> RecordGeometryMainService.getRecord;

    {
      ...state,
      geometryRecord: Some(_handleRemoveComponent(geometry, geometryRecord)),
    };
  };

let handleBatchRemoveComponent =
  (geometryArray: array(geometry), state) => {
    ...state,
    geometryRecord:
      Some(
        geometryArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. geometryRecord, geometry) =>
               _handleRemoveComponent(geometry, geometryRecord),
             state |> RecordGeometryMainService.getRecord,
           ),
      ),
  };