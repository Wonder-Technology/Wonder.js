let prepareGameObject = (sandbox, (vertices, normals, texCoords, indices), state) => {
  open CustomGeometryAPI;
  let (state, gameObject, geometry) = CustomGeometryTool.createGameObject(state);
  let state =
    state
    |> setCustomGeometryVertices(geometry, vertices)
    |> setCustomGeometryTexCoords(geometry, texCoords)
    |> setCustomGeometryNormals(geometry, normals)
    |> setCustomGeometryIndices(geometry, indices);
  (state, gameObject, geometry)
};

let exec = (state: StateDataMainType.state) =>
  /* state |> PregetGLSLDataTool.preparePrecision |> DirectorTool.prepare |> DirectorTool.init; */
  state |> DirectorTool.prepare |> DirectorTool.init;