open Js.Typed_array;

let create = state => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();
  let (state, geometry) = CreateGeometryMainService.create(state);

  /* TODO optimize:  pre-allocate typeArray */
  let state =
    state
    |> VerticesGeometryMainService.setVerticesByTypeArray(
         geometry,
         Float32Array.make(vertices),
       )
    |> TexCoordsGeometryMainService.setTexCoordsByTypeArray(
         geometry,
         Float32Array.make(texCoords),
       )
    |> NormalsGeometryMainService.setNormalsByTypeArray(
         geometry,
         Float32Array.make(normals),
       )
    |> IndicesGeometryMainService.setIndicesByTypeArray(
         geometry,
         Uint16Array.make(indices),
       );

  (state, geometry);
};