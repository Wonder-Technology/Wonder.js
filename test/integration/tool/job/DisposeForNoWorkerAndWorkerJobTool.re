let prepareForDisposeCustomGeometryVboBuffer = (state) => {
  let (state, gameObject1, geometry1) = CustomGeometryTool.createGameObject(state^);
  let state = VboBufferTool.addVboBufferToCustomGeometryBufferMap(geometry1, state);
  let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
  (state, gameObject1, geometry1)
};

let prepareForDisposeGameObjects = (state) => {
  let (state, gameObject1, meshRenderer1) = MeshRendererTool.createBasicMaterialGameObject(state^);
  let (state, gameObject2, meshRenderer2) = MeshRendererTool.createBasicMaterialGameObject(state);
  let (state, geometry1) = BoxGeometryTool.createBoxGeometry(state);
  let (state, geometry2) = BoxGeometryTool.createBoxGeometry(state);
  let state = state |> GameObjectAPI.addGameObjectCustomGeometryComponent(gameObject1, geometry1);
  let state = state |> GameObjectAPI.addGameObjectCustomGeometryComponent(gameObject2, geometry2);
  (state, gameObject1, gameObject2)
};

let prepareCustomGeometryGameObjects = (state) => {
  let (state, gameObject1, geometry1) = CustomGeometryTool.createGameObject(state^);
  let (state, gameObject2, geometry2) = CustomGeometryTool.createGameObject(state);
  let (state, gameObject3, geometry3) = CustomGeometryTool.createGameObject(state);

  (state, (gameObject1, gameObject2, gameObject3), (geometry1, geometry2, geometry3))
};