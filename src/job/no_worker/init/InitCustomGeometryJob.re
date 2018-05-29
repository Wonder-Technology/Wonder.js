open StateDataMainType;

open CustomGeometryType;

open Js.Typed_array;

/* TODO test */
let execJob = (flags, state) => {
  let {index} = RecordCustomGeometryMainService.getRecord(state);
  let state =
    ArrayService.range(0, index - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (state, geometry) =>
             NormalsCustomGeometryMainService.hasNormals(geometry, state) ?
               state :
               {
                 ComputeNormalsCustomGeometryService.computeVertexNormals(
                   [@bs] VerticesCustomGeometryMainService.getVertices(geometry, state),
                   [@bs] IndicesCustomGeometryMainService.getIndices(geometry, state),
                   [@bs] NormalsCustomGeometryMainService.getNormals(geometry, state)
                 );
                 state
               }
         ),
         state
       );
  state
};