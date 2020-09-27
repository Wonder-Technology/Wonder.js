open Js.Typed_array;

let addTangents = ((vertices, texCoords, normals, indices)) => {
  let (vertices, texCoords, normals, indices) = (
    Float32Array.make(vertices),
    Float32Array.make(texCoords),
    Float32Array.make(normals),
    Uint32Array.make(indices),
  );

  (
    vertices,
    texCoords,
    normals,
    TangentsGeometryDoService.computeTangents(
      vertices->VerticesVO.create,
      texCoords->TexCoordsVO.create,
      normals->NormalsVO.create,
      indices->IndicesVO.create,
    )
    ->TangentsVO.value,
    indices,
  );
};
