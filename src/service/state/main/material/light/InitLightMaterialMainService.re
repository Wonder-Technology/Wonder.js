open StateDataMainType;

open MaterialType;

open LightMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray, gameObjectsMap} =
    RecordLightMaterialMainService.getRecord(state);

  InitMaterialMainService.initMaterials(
    materialIndexArr,
    gl,
    (index, disposedIndexArray, gameObjectsMap),
    (
      InitInitLightMaterialService.initMaterial,
      CreateInitLightMaterialStateMainService.createInitMaterialState,
    ),
    state,
  );
};

let handleInitComponent = (materialIndex: int, state) => {
  let {
    index,
    disposedIndexArray,
    shaderIndices,
    materialArrayForWorkerInit,
    gameObjectsMap,
  } =
    RecordLightMaterialMainService.getRecord(state);

  InitMaterialMainService.handleInitComponent(
    materialIndex,
    (
      index,
      disposedIndexArray,
      shaderIndices,
      materialArrayForWorkerInit,
      gameObjectsMap,
    ),
    (
      InitInitLightMaterialService.isNeedInitMaterial,
      InitInitLightMaterialService.initMaterial,
      CreateInitLightMaterialStateMainService.createInitMaterialState,
    ),
    state,
  );
};

let reInitComponents = (materialIndices: array(int), state) => {
  let {shaderIndices, index, disposedIndexArray, gameObjectsMap} =
    RecordLightMaterialMainService.getRecord(state);

  InitMaterialMainService.reInitComponents(
    materialIndices,
    (shaderIndices, gameObjectsMap, index, disposedIndexArray),
    (
      InitInitLightMaterialService.reInitMaterial,
      CreateInitLightMaterialStateMainService.createInitMaterialState,
    ),
    state,
  );
};