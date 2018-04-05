open StateDataMainType;

open BoxGeometryType;

open TypeArrayService;

open Js.Typed_array;

let getNormals =
  [@bs]
  (
    (index, state) =>
      OperateTypeArrayBoxGeometryService.getNormalsTypeArray(
        index,
        RecordBoxGeometryMainService.getRecord(state).normals
      )
  );

let setNormals = (index, data: array(float), state) => {
  OperateTypeArrayBoxGeometryService.setNormals(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).normals
  )
  |> ignore;
  state
};

let setNormalsByTypeArray = (index: int, data: Float32Array.t, state) => {
  OperateTypeArrayBoxGeometryService.setNormalsByTypeArray(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).normals
  )
  |> ignore;
  state
};