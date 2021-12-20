open Js.Typed_array

let computeTangents = (vertices, texCoords, normals, indices) => {
  let triangleCount = indices->Uint32Array.length / 3
  let vertexCount = vertices->Float32Array.length / 3
  let tan1 = Float32Array.fromLength(vertexCount * 3)
  let tan2 = Float32Array.fromLength(vertexCount * 3)
  let i = ref(0)
  let tangents = Float32Array.fromLength(vertexCount * 3)

  while i.contents < triangleCount {
    let i1 = Uint32Array.unsafe_get(indices, i.contents * 3)
    let i2 = Uint32Array.unsafe_get(indices, i.contents * 3 + 1)
    let i3 = Uint32Array.unsafe_get(indices, i.contents * 3 + 2)

    let v1x = Float32Array.unsafe_get(vertices, i1 * 3)
    let v1y = Float32Array.unsafe_get(vertices, i1 * 3 + 1)
    let v1z = Float32Array.unsafe_get(vertices, i1 * 3 + 2)

    let v2x = Float32Array.unsafe_get(vertices, i2 * 3)
    let v2y = Float32Array.unsafe_get(vertices, i2 * 3 + 1)
    let v2z = Float32Array.unsafe_get(vertices, i2 * 3 + 2)

    let v3x = Float32Array.unsafe_get(vertices, i3 * 3)
    let v3y = Float32Array.unsafe_get(vertices, i3 * 3 + 1)
    let v3z = Float32Array.unsafe_get(vertices, i3 * 3 + 2)

    let w1x = Float32Array.unsafe_get(texCoords, i1 * 2)
    let w1y = Float32Array.unsafe_get(texCoords, i1 * 2 + 1)

    let w2x = Float32Array.unsafe_get(texCoords, i2 * 2)
    let w2y = Float32Array.unsafe_get(texCoords, i2 * 2 + 1)

    let w3x = Float32Array.unsafe_get(texCoords, i3 * 2)
    let w3y = Float32Array.unsafe_get(texCoords, i3 * 2 + 1)

    let x1 = v2x -. v1x
    let x2 = v3x -. v1x
    let y1 = v2y -. v1y
    let y2 = v3y -. v1y
    let z1 = v2z -. v1z
    let z2 = v3z -. v1z

    let s1 = w2x -. w1x
    let s2 = w3x -. w1x
    let t1 = w2y -. w1y
    let t2 = w3y -. w1y

    let area = s1 *. t2 -. s2 *. t1

    // Area can 0.0 for degenerate triangles or bad uv coordinates
    let ((sx, sy, sz), (tx, ty, tz)) =
      area == 0.0
        ? ((0., 1., 0.), (1., 0., 0.))
        : {
            let r = 1. /. area

            (
              (
                (t2 *. x1 -. t1 *. x2) *. r,
                (t2 *. y1 -. t1 *. y2) *. r,
                (t2 *. z1 -. t1 *. z2) *. r,
              ),
              (
                (s1 *. x2 -. s2 *. x1) *. r,
                (s1 *. y2 -. s2 *. y1) *. r,
                (s1 *. z2 -. s2 *. z1) *. r,
              ),
            )
          }

    Float32Array.unsafe_set(tan1, i1 * 3 + 0, Float32Array.unsafe_get(tan1, i1 * 3 + 0) +. sx)
    Float32Array.unsafe_set(tan1, i1 * 3 + 1, Float32Array.unsafe_get(tan1, i1 * 3 + 1) +. sy)
    Float32Array.unsafe_set(tan1, i1 * 3 + 2, Float32Array.unsafe_get(tan1, i1 * 3 + 2) +. sz)

    Float32Array.unsafe_set(tan1, i2 * 3 + 0, Float32Array.unsafe_get(tan1, i2 * 3 + 0) +. sx)
    Float32Array.unsafe_set(tan1, i2 * 3 + 1, Float32Array.unsafe_get(tan1, i2 * 3 + 1) +. sy)
    Float32Array.unsafe_set(tan1, i2 * 3 + 2, Float32Array.unsafe_get(tan1, i2 * 3 + 2) +. sz)

    Float32Array.unsafe_set(tan1, i3 * 3 + 0, Float32Array.unsafe_get(tan1, i3 * 3 + 0) +. sx)
    Float32Array.unsafe_set(tan1, i3 * 3 + 1, Float32Array.unsafe_get(tan1, i3 * 3 + 1) +. sy)
    Float32Array.unsafe_set(tan1, i3 * 3 + 2, Float32Array.unsafe_get(tan1, i3 * 3 + 2) +. sz)

    Float32Array.unsafe_set(tan2, i1 * 3 + 0, Float32Array.unsafe_get(tan2, i1 * 3 + 0) +. tx)
    Float32Array.unsafe_set(tan2, i1 * 3 + 1, Float32Array.unsafe_get(tan2, i1 * 3 + 1) +. ty)
    Float32Array.unsafe_set(tan2, i1 * 3 + 2, Float32Array.unsafe_get(tan2, i1 * 3 + 2) +. tz)

    Float32Array.unsafe_set(tan2, i2 * 3 + 0, Float32Array.unsafe_get(tan2, i2 * 3 + 0) +. tx)
    Float32Array.unsafe_set(tan2, i2 * 3 + 1, Float32Array.unsafe_get(tan2, i2 * 3 + 1) +. ty)
    Float32Array.unsafe_set(tan2, i2 * 3 + 2, Float32Array.unsafe_get(tan2, i2 * 3 + 2) +. tz)

    Float32Array.unsafe_set(tan2, i3 * 3 + 0, Float32Array.unsafe_get(tan2, i3 * 3 + 0) +. tx)
    Float32Array.unsafe_set(tan2, i3 * 3 + 1, Float32Array.unsafe_get(tan2, i3 * 3 + 1) +. ty)
    Float32Array.unsafe_set(tan2, i3 * 3 + 2, Float32Array.unsafe_get(tan2, i3 * 3 + 2) +. tz)

    i := i.contents + 1
  }

  i := 0

  while i.contents < vertexCount {
    let n = (
      Float32Array.unsafe_get(normals, i.contents * 3),
      Float32Array.unsafe_get(normals, i.contents * 3 + 1),
      Float32Array.unsafe_get(normals, i.contents * 3 + 2),
    )

    let t1 = (
      Float32Array.unsafe_get(tan1, i.contents * 3),
      Float32Array.unsafe_get(tan1, i.contents * 3 + 1),
      Float32Array.unsafe_get(tan1, i.contents * 3 + 2),
    )

    let t2 = (
      Float32Array.unsafe_get(tan2, i.contents * 3),
      Float32Array.unsafe_get(tan2, i.contents * 3 + 1),
      Float32Array.unsafe_get(tan2, i.contents * 3 + 2),
    )

    // Gram-Schmidt orthogonalize
    let ndott = WonderCommonlib.Vector3.dot(n, t1)
    let temp = WonderCommonlib.Vector3.scale(WonderCommonlib.Vector3.Float, n, ndott)
    let (tempX, tempY, tempZ) =
      WonderCommonlib.Vector3.sub(
        WonderCommonlib.Vector3.Float,
        t1,
        temp,
      )->WonderCommonlib.Vector3.normalize

    Float32Array.unsafe_set(tangents, i.contents * 3, tempX)
    Float32Array.unsafe_set(tangents, i.contents * 3 + 1, tempY)
    Float32Array.unsafe_set(tangents, i.contents * 3 + 2, tempZ)

    i := i.contents + 1
  }

  tangents
}
