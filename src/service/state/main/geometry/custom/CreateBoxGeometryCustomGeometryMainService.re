open Js.Typed_array;

let create = state => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();
  let (state, geometry) = CreateCustomGeometryMainService.create(state);

  /* TODO optimize:  pre-allocate typeArray */
  let state =
    state
    |> VerticesCustomGeometryMainService.setVerticesByTypeArray(
         geometry,
         Float32Array.make(vertices),
       )
    |> TexCoordsCustomGeometryMainService.setTexCoordsByTypeArray(
         geometry,
         Float32Array.make(texCoords),
       )
    |> NormalsCustomGeometryMainService.setNormalsByTypeArray(
         geometry,
         Float32Array.make(normals),
       )
    |> IndicesCustomGeometryMainService.setIndicesByTypeArray(
         geometry,
         Uint16Array.make(indices),
       );

  (state, geometry);
};