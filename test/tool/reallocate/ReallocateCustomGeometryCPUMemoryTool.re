let prepareForOptimize = (state) => {
  let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
  let (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (indices1, indices2, indices3)
  ) =
    CustomGeometryTool.createThreeGameObjectsAndSetPointData(state);
  let state =
    state
    |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
         gameObject1,
         geometry1
       );
  let state =
    state
    |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
         gameObject2,
         geometry2
       );
  (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (indices1, indices2, indices3)
  )
};

let judgeForOptimize =
    (
      state,
      (gameObject1, gameObject2, gameObject3),
      (geometry1, geometry2, geometry3),
      (vertices1, vertices2, vertices3),
      (texCoords1, texCoords2, texCoords3),
      (normals1, normals2, normals3),
      (indices1, indices2, indices3)
    ) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  CustomGeometryAPI.(
    (
      getCustomGeometryVertices(geometry3, state),
      getCustomGeometryTexCoords(geometry3, state),
      getCustomGeometryNormals(geometry3, state),
      getCustomGeometryIndices(geometry3, state)
    )
    |> expect == (vertices3, texCoords3, normals3, indices3)
  )
};