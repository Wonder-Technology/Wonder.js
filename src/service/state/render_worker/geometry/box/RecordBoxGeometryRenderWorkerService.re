open StateDataRenderWorkerType;

open RenderWorkerBoxGeometryType;

open Js.Typed_array;

let getRecord = (state) => state.boxGeometryRecord;

let create = () => {
  let (vertices, normals, indices) = ComputePointsBoxGeometryService.generateAllFaces();
  {
    vertices: Float32Array.make(vertices),
    normals: Float32Array.make(normals),
    indices: Uint16Array.make(indices)
  }
};