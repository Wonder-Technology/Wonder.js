open StateDataMainType;

open BoxGeometryType;

open TypeArrayService;

open Js.Typed_array;

let getIndices =
  [@bs]
  (
    (index, state) =>
      OperateTypeArrayBoxGeometryService.getIndicesTypeArray(
        index,
        RecordBoxGeometryMainService.getRecord(state).indices
      )
  );

let setIndices = (index, data: array(int), state) => {
  OperateTypeArrayBoxGeometryService.setIndices(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).indices
  )
  |> ignore;
  state
};

let setIndicesByTypeArray = (index: int, data: Uint16Array.t, state) => {
  OperateTypeArrayBoxGeometryService.setIndicesByTypeArray(
    index,
    data,
    RecordBoxGeometryMainService.getRecord(state).indices
  )
  |> ignore;
  state
};

let getIndicesCount = (index, state) => BufferBoxGeometryService.getIndicesCount();