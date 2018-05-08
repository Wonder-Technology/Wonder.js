open StateDataRenderWorkerType;

open RenderWorkerBoxGeometryType;

open Js.Typed_array;

let getRecord = (state) => state.boxGeometryRecord;

let create = () => {
  let (vertices, texCoords, normals, indices) = ComputePointsBoxGeometryService.generateAllFaces();
  {
    vertices: Float32Array.make(vertices),
    texCoords: Float32Array.make(texCoords),
    normals: Float32Array.make(normals),
    indices: Uint16Array.make(indices)
  }
};