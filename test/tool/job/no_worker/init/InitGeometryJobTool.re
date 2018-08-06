let prepareGameObject = (sandbox, (vertices, normals, texCoords, indices), state) => {
  open GeometryAPI;
  let (state, gameObject, geometry) = GeometryTool.createGameObject(state);
  let state =
    state
    |> setGeometryVertices(geometry, vertices)
    |> setGeometryTexCoords(geometry, texCoords)
    |> setGeometryNormals(geometry, normals)
    |> setGeometryIndices(geometry, indices);
  (state, gameObject, geometry)
};

let exec = (state: StateDataMainType.state) =>
  /* state |> PregetGLSLDataTool.preparePrecision |> DirectorTool.prepare |> DirectorTool.init; */
  state |> DirectorTool.prepare |> DirectorTool.init;