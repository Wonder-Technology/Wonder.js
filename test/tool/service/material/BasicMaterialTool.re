open StateDataMainType;

open BasicMaterialType;

let getRecord = state => RecordBasicMaterialMainService.getRecord(state);

let createMaterialWithMap = state => {
  let (state, material) = BasicMaterialAPI.createBasicMaterial(state);
  let (state, texture) =
    BasicSourceTextureAPI.createBasicSourceTexture(state);
  let source = BasicSourceTextureTool.buildSource(10, 20);
  let state =
    state
    |> BasicSourceTextureAPI.setBasicSourceTextureSource(texture, source);
  let state = BasicMaterialAPI.setBasicMaterialMap(material, texture, state);

  (state, material, (texture, source));
};

let createMaterialWithArrayBufferViewMap = state => {
  let (state, material) = BasicMaterialAPI.createBasicMaterial(state);
  let (state, texture) =
    ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(state);
  let source = ArrayBufferViewSourceTextureTool.buildSource();
  let state =
    state
    |> ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
         texture,
         source,
       );
  let state = BasicMaterialAPI.setBasicMaterialMap(material, texture, state);

  (state, material, (texture, source));
};

let createGameObject = state => {
  open BasicMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material);
};

let setMaps = (material, map, state) => {
  let state = state |> BasicMaterialAPI.setBasicMaterialMap(material, map);

  (state, map);
};

let createGameObjectWithMap = state => {
  let (state, gameObject, material) = createGameObject(state);
  let (state, texture) =
    BasicSourceTextureAPI.createBasicSourceTexture(state);
  let (state, texture) = setMaps(material, texture, state);

  (state, gameObject, (material, texture));
};

let createGameObjectWithMaterial = (material, state) => {
  open GameObjectAPI;
  let (state, gameObject) = state |> createGameObject;
  let state =
    state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material);
};

let getDefaultShaderIndex = state =>
  DefaultTypeArrayValueService.getDefaultShaderIndex();

let getDefaultColor = state => getRecord(state).defaultColor;

let initMaterials = (gl, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray} =
    RecordBasicMaterialMainService.getRecord(state);
  InitInitBasicMaterialService.init(
    gl,
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordBasicMaterialMainService.getRecord(state).gameObjectsMap,
        gameObjectRecord,
      ),
      JudgeInstanceMainService.isSupportInstance(state),
    ),
    CreateInitBasicMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray),
      state,
    ),
  )
  |> ignore;
  state;
};

let getShaderIndex = (materialIndex: int, state) =>
  ShaderIndicesService.getShaderIndex(
    materialIndex,
    RecordBasicMaterialMainService.getRecord(state).shaderIndices,
  );

/* let hasShaderIndex = (materialIndex: int, state: StateDataMainType.state) =>
   ShaderIndexBasicMaterialMainService.hasShaderIndex(materialIndex, state); */
let setShaderIndex =
    (materialIndex: int, shaderIndex, state: StateDataMainType.state) =>
  ShaderIndexBasicMaterialMainService.setShaderIndex(.
    materialIndex,
    shaderIndex,
    state,
  );

let dispose = (gameObject, material, state: StateDataMainType.state) =>
  GameObjectTool.disposeGameObjectBasicMaterialComponent(
    gameObject,
    material,
    state,
  );

let initMaterial = (materialIndex, state) =>
  InitBasicMaterialMainService.handleInitComponent(materialIndex, state);

let isMaterialDisposed = (material, state) => {
  open BasicMaterialType;
  let {disposedIndexArray} = getRecord(state);
  disposedIndexArray |> Js.Array.includes(material);
};

let getMapUnit = (material, state) =>
  OperateTypeArrayBasicMaterialService.getMapUnit(.
    material,
    getRecord(state).mapUnits,
  );

let setMapUnit = (material, unit, state) => {
  OperateTypeArrayBasicMaterialService.setMapUnit(.
    material,
    unit,
    getRecord(state).mapUnits,
  )
  |> ignore;
  state;
};

let getTextureIndicesIndex = (material, state) =>
  BufferBasicMaterialService.getTextureIndicesIndex(
    material,
    BufferSettingService.getTextureCountPerMaterial(state.settingRecord),
  );

let getDefaultTextureIndex = () =>
  BufferMaterialService.getDefaultTextureIndex();

let hasGameObject = (material, state) =>
  switch (
    GameObjectBasicMaterialService.getGameObjects(material, getRecord(state))
  ) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

let isNeedInitMaterial = (material, state) =>
  InitInitBasicMaterialService.isNeedInitMaterial(
    material,
    getRecord(state).shaderIndices,
  );

let getEmptyMapUnitArray = (material, state) =>
  EmptyMapUnitArrayMapService._unsafeGetEmptyMapUnitArray(
    material,
    getRecord(state).emptyMapUnitArrayMap,
  );

let getDefaultIsDepthTest = () => true;

let getDefaultAlpha = () => BufferBasicMaterialService.getDefaultAlpha();

let disposeBasicMaterial = (material, state) =>
  BasicMaterialAPI.batchDisposeBasicMaterial([|material|], state);