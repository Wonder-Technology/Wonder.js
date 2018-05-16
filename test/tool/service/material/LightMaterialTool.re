open StateDataMainType;

open LightMaterialType;

let getRecord = (state) => RecordLightMaterialMainService.getRecord(state);

let createGameObject = (state) => {
  open LightMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createLightMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let createGameObjectWithMap = (state) => {
  let (state, gameObject, material) = createGameObject(state);
  let (state, texture1) = TextureAPI.createTexture(state);
  let (state, texture2) = TextureAPI.createTexture(state);
  let state = state |> LightMaterialAPI.setLightMaterialDiffuseMap(material, texture1);
  let state = state |> LightMaterialAPI.setLightMaterialSpecularMap(material, texture2);
  (state, gameObject, (material, (texture1, texture2)))
};

let createGameObjectWithMaterial = (material, state) => {
  open GameObjectAPI;
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectLightMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let getDefaultShaderIndex = (state) => DefaultTypeArrayValueService.getDefaultShaderIndex();

let getDefaultDiffuseColor = (state) => getRecord(state).defaultDiffuseColor;

let getDefaultSpecularColor = (state) => getRecord(state).defaultSpecularColor;

let getDefaultShininess = (state) => getRecord(state).defaultShininess;

let initMaterials = (gl, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray} = RecordLightMaterialMainService.getRecord(state);
  InitInitLightMaterialService.init(
    gl,
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordLightMaterialMainService.getRecord(state).gameObjectMap,
        gameObjectRecord
      ),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    CreateInitLightMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray),
      state
    )
  )
  |> ignore;
  state
};

let getShaderIndex = (materialIndex: int, state) =>
  ShaderIndicesService.getShaderIndex(
    materialIndex,
    RecordLightMaterialMainService.getRecord(state).shaderIndices
  );

/* let hasShaderIndex = (materialIndex: int, state: StateDataMainType.state) =>
   ShaderIndexLightMaterialMainService.hasShaderIndex(materialIndex, state); */
let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataMainType.state) =>
  [@bs] ShaderIndexLightMaterialMainService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataMainType.state) =>
  GameObjectTool.disposeGameObjectLightMaterialComponent((-1), material, state);

let initMaterial = (materialIndex, state) =>
  InitLightMaterialMainService.handleInitComponent(materialIndex, state);

let isMaterialDisposed = (material, state) => {
  open LightMaterialType;
  let {disposedIndexArray} = getRecord(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupLightMaterialService.getGroupCount(material, getRecord(state));

let getTextureCount = (material, state) =>
  TextureCountMapMaterialService.unsafeGetCount(material, getRecord(state).textureCountMap);

let getDiffuseMapUnit = (material, state) =>
  OperateTypeArrayLightMaterialService.getDiffuseMapUnit(
    material,
    getRecord(state).diffuseMapUnits
  );

let setDiffuseMapUnit = (material, unit, state) => {
  OperateTypeArrayLightMaterialService.setDiffuseMapUnit(
    material,
    unit,
    getRecord(state).diffuseMapUnits
  )
  |> ignore;
  state
};

let getSpecularMapUnit = (material, state) =>
  OperateTypeArrayLightMaterialService.getSpecularMapUnit(
    material,
    getRecord(state).diffuseMapUnits
  );

let setSpecularMapUnit = (material, unit, state) => {
  OperateTypeArrayLightMaterialService.setSpecularMapUnit(
    material,
    unit,
    getRecord(state).diffuseMapUnits
  )
  |> ignore;
  state
};

let getTextureIndicesIndex = (material, state) =>
  BufferLightMaterialService.getTextureIndicesIndex(
    material,
    BufferSettingService.getTextureCountPerMaterial(state.settingRecord)
  );

let getDefaultTextureIndex = () => BufferLightMaterialService.getDefaultTextureIndex();