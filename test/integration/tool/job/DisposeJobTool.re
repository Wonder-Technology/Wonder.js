let prepareForDisposeBoxGeometryVboBuffer = (state) => {
  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
  let state = VboBufferTool.addVboBufferToBoxGeometryBufferMap(geometry1, state);
  let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
  (state, gameObject1, geometry1)
};

let prepareForDisposeGameObjects = (state) => {
  let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
  let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
  (state, gameObject1, gameObject2)
};

let prepareBoxAndCustomGeometryGameObjects = (state) => {
  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
  let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
  let (state, gameObject3, geometry3) = CustomGeometryTool.createGameObject(state);
  (state, (gameObject1, gameObject2, gameObject3), (geometry1, geometry2, geometry3))
};