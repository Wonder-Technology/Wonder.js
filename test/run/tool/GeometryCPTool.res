open Js.Typed_array

let buildRepoWithTwoGeometriesAndSetPointData = sandbox => {
  let geometry1 = 2->Obj.magic
  let geometry2 = 30->Obj.magic

  let vertices1 = Float32Array.make([10., 10., 11., 1.5, 2.0, 3.0, 2.5, 2.0, 3.5])
  let vertices2 = Float32Array.make([20., 10., 11., 1.5, 3.0, 1.0, 2.5, 2.5, -1.5, 2., 3., 10.])
  let texCoords1 = Float32Array.make([0.5, 0., 0.1, 1., 0.2, 0.5])
  let texCoords2 = Float32Array.make([0.1, 0.1, 0.6, 0.7, 0.12, 0.5, 0.6, 0.24])
  let normals1 = Float32Array.make([1., 2., 3., 2., 1.5, 3., 3., 3.5, 4.5])
  let normals2 = Float32Array.make([2., -1., 3.5, 2., 1.0, 3.5, 3., 5.5, -2.5, -1., 2., 3.])
  let tangents1 = Float32Array.make([
    -0.24470466375350952,
    -0.5224775075912476,
    -0.8167845010757446,
    -0.5092150568962097,
    -0.3632996380329132,
    -0.7802008390426636,
    -0.4640968143939972,
    -0.5406073331832886,
    -0.7016821503639221,
  ])
  let tangents2 = Float32Array.make([
    -0.46341636776924133,
    0.28125104308128357,
    -0.8403232097625732,
    -0.4861387014389038,
    -0.2385973036289215,
    -0.8406785726547241,
    -0.3303399085998535,
    -0.7303808927536011,
    0.5978455543518066,
    0.2768343389034271,
    -0.5682389140129089,
    -0.7748982310295105,
  ])
  let indices1 = Uint32Array.make([2, 1, 0])
  let indices2 = Uint32Array.make([2, 0, 1, 3, 1, 2])

  (
    SceneGraphRepoDependencyTool.buildGeometryRepo(
      ~sandbox,
      ~isSame=(geometry1, geometry2) => geometry1 == geometry2,
      ~isFlipTexCoordY=geometry =>
        switch geometry {
        | geometry when geometry == geometry1 => false
        | geometry when geometry == geometry2 => true
        },
      ~getId=geometry => geometry->Obj.magic,
      ~getVertices=geometry =>
        switch geometry {
        | geometry when geometry == geometry1 => vertices1
        | geometry when geometry == geometry2 => vertices2
        },
      ~getNormals=geometry =>
        switch geometry {
        | geometry when geometry == geometry1 => Js.Nullable.return(normals1)
        | geometry when geometry == geometry2 => Js.Nullable.return(normals2)
        },
      ~getTexCoords=geometry =>
        switch geometry {
        | geometry when geometry == geometry1 => Js.Nullable.return(texCoords1)
        | geometry when geometry == geometry2 => Js.Nullable.return(texCoords2)
        },
      ~getTangents=geometry =>
        switch geometry {
        | geometry when geometry == geometry1 => Js.Nullable.return(tangents1)
        | geometry when geometry == geometry2 => Js.Nullable.return(tangents2)
        },
      ~getIndices=geometry =>
        switch geometry {
        | geometry when geometry == geometry1 => Js.Nullable.return(indices1)
        | geometry when geometry == geometry2 => Js.Nullable.return(indices2)
        },
      (),
    ),
    (
      (geometry1, geometry2),
      (
        (vertices1, vertices2),
        (texCoords1, texCoords2),
        (normals1, normals2),
        (tangents1, tangents2),
        (indices1, indices2),
      ),
    ),
  )
}
