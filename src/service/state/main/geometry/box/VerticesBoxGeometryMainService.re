open StateDataMainType;

open BoxGeometryType;

open TypeArrayService;

open Js.Typed_array;

/* let getVertices =
  [@bs]
  (
    (index, state) =>
      RecordBoxGeometryMainService.getVerticesTypeArray(
        index,
        RecordBoxGeometryMainService.getRecord(state).vertices
      )
  ); */

let setVertices = (index, data: array(float), state) => {
  OperateTypeArrayBoxGeometryService.setVertices(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).vertices
  )
  |> ignore;
  state
};

let setVerticesByTypeArray = (index: int, data: Float32Array.t, state) => {
  OperateTypeArrayBoxGeometryService.setVerticesByTypeArray(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).vertices
  )
  |> ignore;
  state
};