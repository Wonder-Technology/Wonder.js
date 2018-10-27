open Js.Typed_array;

let create = ((vertices, texCoords, normals, indices), state) => {
  let (state, geometry) = CreateGeometryMainService.create(. state);

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
    |> IndicesGeometryMainService.setIndicesByUint16Array(
         geometry,
         Uint16Array.make(indices),
       );

  (state, geometry);
};