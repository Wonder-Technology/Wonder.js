let prepareForDisposeGeometryVboBuffer = (state) => {
  let (state, gameObject1, geometry1) = GeometryTool.createGameObject(state^);
  let state = VboBufferTool.addVboBufferToGeometryBufferMap(geometry1, state);
  let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
  (state, gameObject1, geometry1)
};

let prepareForDisposeGameObjects = (state) => {
  let (state, gameObject1, meshRenderer1) = MeshRendererTool.createBasicMaterialGameObject(state^);
  let (state, gameObject2, meshRenderer2) = MeshRendererTool.createBasicMaterialGameObject(state);
  let (state, geometry1) = BoxGeometryTool.createBoxGeometry(state);
  let (state, geometry2) = BoxGeometryTool.createBoxGeometry(state);
  let state = state |> GameObjectAPI.addGameObjectGeometryComponent(gameObject1, geometry1);
  let state = state |> GameObjectAPI.addGameObjectGeometryComponent(gameObject2, geometry2);
  (state, gameObject1, gameObject2)
};

let prepareGeometryGameObjects = (state) => {
  let (state, gameObject1, geometry1) = GeometryTool.createGameObject(state^);
  let (state, gameObject2, geometry2) = GeometryTool.createGameObject(state);
  let (state, gameObject3, geometry3) = GeometryTool.createGameObject(state);

  (state, (gameObject1, gameObject2, gameObject3), (geometry1, geometry2, geometry3))
};