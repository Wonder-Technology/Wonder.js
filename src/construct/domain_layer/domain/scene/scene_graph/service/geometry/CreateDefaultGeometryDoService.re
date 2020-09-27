open Js.Typed_array;

let create = ((vertices, texCoords, normals, tangents, indices)) => {
  let vertices = vertices->VerticesVO.create;
  let texCoords = texCoords->TexCoordsVO.create;
  let normals = normals->NormalsVO.create;
  let tangents = tangents->TangentsVO.create;
  let indices = indices->IndicesVO.create;

  CreateGeometryDoService.create()
  ->Result.bind(geometry => {
      VerticesGeometryDoService.setVertices(geometry, vertices)
      ->Result.bind(() => {
          TexCoordsGeometryDoService.setTexCoords(geometry, texCoords)
        })
      ->Result.bind(() => {
          NormalsGeometryDoService.setNormals(geometry, normals)
        })
      ->Result.bind(() => {
          TangentsGeometryDoService.setTangents(geometry, tangents)
        })
      ->Result.bind(() => {
          IndicesGeometryDoService.setIndices(geometry, indices)
        })
      ->Result.mapSuccess(() => geometry)
    });
};
