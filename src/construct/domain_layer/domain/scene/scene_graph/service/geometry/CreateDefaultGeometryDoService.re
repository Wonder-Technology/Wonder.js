open Js.Typed_array;

let create = ((vertices, normals, indices)) => {
  CreateGeometryDoService.create()
  ->Result.bind(geometry => {
      VerticesGeometryDoService.setVertices(
        geometry,
        Float32Array.make(vertices)->VerticesVO.create,
      )
      ->Result.bind(() => {
          NormalsGeometryDoService.setNormals(
            geometry,
            Float32Array.make(normals)->NormalsVO.create,
          )
        })
      ->Result.bind(() => {
          IndicesGeometryDoService.setIndices(
            geometry,
            Uint32Array.make(indices)->IndicesVO.create,
          )
        })
      ->Result.mapSuccess(() => geometry)
    });
};
