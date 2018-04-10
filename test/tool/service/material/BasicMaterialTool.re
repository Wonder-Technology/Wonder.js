open StateDataMainType;

open BasicMaterialType;

let getMaterialRecord = (state) => RecordBasicMaterialMainService.getRecord(state);

let createGameObject = (state) => {
  open BasicMaterialAPI;
  open GameObjectAPI;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject) = state |> createGameObject;
  let state = state |> addGameObjectBasicMaterialComponent(gameObject, material);
  (state, gameObject, material)
};

let getDefaultShaderIndex = (state) => getMaterialRecord(state).defaultShaderIndex;

let getDefaultColor = (state) => getMaterialRecord(state).defaultColor;

let initMaterials = (gl, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray, shaderIndices} = RecordBasicMaterialMainService.getRecord(state);
  InitBasicMaterialInitMaterialService.init(
    gl,
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordBasicMaterialMainService.getRecord(state).gameObjectMap,
        gameObjectRecord
      ),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    CreateInitMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};

let getShaderIndex = (materialIndex: int, state: StateDataMainType.state) =>
  [@bs] ShaderIndexBasicMaterialMainService.getShaderIndex(materialIndex, state);

/* let hasShaderIndex = (materialIndex: int, state: StateDataMainType.state) =>
   ShaderIndexBasicMaterialMainService.hasShaderIndex(materialIndex, state); */
let setShaderIndex = (materialIndex: int, shaderIndex, state: StateDataMainType.state) =>
  [@bs] ShaderIndexBasicMaterialMainService.setShaderIndex(materialIndex, shaderIndex, state);

let dispose = (material, state: StateDataMainType.state) => {
  ...state,
  basicMaterialRecord:
    Some(DisposeBasicMaterialService.handleDisposeComponent(material, getMaterialRecord(state)))
};

let initMaterial = (materialIndex, state) =>
  /* let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
     [@bs]
     InitBasicMaterialInitMaterialService.initMaterial(
       [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
       (
         materialIndex,
         JudgeInstanceMainService.isSourceInstance(
           materialIndex,
           gameObjectMap,
           state.gameObjectRecord
         ),
         JudgeInstanceMainService.isSupportInstance(state)
       ),

       CreateInitMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray, shaderIndices),
         state
       )
     )
     |> ignore;
     state */
  InitBasicMaterialMainService.handleInitComponent(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    materialIndex,
    state
  );

let isMaterialDisposed = (material, state) => {
  open BasicMaterialType;
  let {disposedIndexArray} = getMaterialRecord(state);
  disposedIndexArray |> Js.Array.includes(material)
};

let getGroupCount = (material, state) =>
  GroupBasicMaterialService.getGroupCount(material, getMaterialRecord(state));