open Js.Typed_array

let addTangents = ((vertices, texCoords, normals, indices)) => {
  let (vertices, texCoords, normals, indices) = (
    Float32Array.make(vertices),
    Float32Array.make(texCoords),
    Float32Array.make(normals),
    Uint32Array.make(indices),
  )

  (
    vertices,
    texCoords,
    normals,
    TangentsGeometryService.computeTangents(vertices, texCoords, normals, indices),
    indices,
  )
}
