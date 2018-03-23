open MainStateDataType;

open BoxGeometryType;

open TypeArrayService;

open Js.Typed_array;

let getIndices =
  [@bs]
  (
    (index, state) =>
      RecordBoxGeometryMainService.getIndicesTypeArray(
        index,
        RecordBoxGeometryMainService.getRecord(state).indices
      )
  );

let setIndices = (index, data: array(int), state) => {
  RecordBoxGeometryMainService.setIndices(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).indices
  )
  |> ignore;
  state
};

let setIndicesByTypeArray = (index: int, data: Uint16Array.t, state) => {
  RecordBoxGeometryMainService.setIndicesByTypeArray(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).indices
  )
  |> ignore;
  state
};

let getIndicesCount = (index, state) => RecordBoxGeometryMainService.getIndicesCount();