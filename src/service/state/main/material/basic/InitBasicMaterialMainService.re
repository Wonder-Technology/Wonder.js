open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray, gameObjectsMap} =
    RecordBasicMaterialMainService.getRecord(state);

  InitMaterialMainService.initMaterials(
    materialIndexArr,
    (gl, index, disposedIndexArray, gameObjectsMap),
    (
      InitInitBasicMaterialService.initMaterial,
      CreateInitBasicMaterialStateMainService.createInitMaterialState,
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
    RecordBasicMaterialMainService.getRecord(state);

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
      InitInitBasicMaterialService.isNeedInitMaterial,
      InitInitBasicMaterialService.initMaterial,
      CreateInitBasicMaterialStateMainService.createInitMaterialState,
    ),
    state,
  );
};

let reInitComponents = (materialIndices: array(int), state) => {
  let {shaderIndices, index, disposedIndexArray, gameObjectsMap} =
    RecordBasicMaterialMainService.getRecord(state);

  InitMaterialMainService.reInitComponents(
    materialIndices,
    (shaderIndices, gameObjectsMap, index, disposedIndexArray),
    (
      InitInitBasicMaterialService.reInitMaterial,
      CreateInitBasicMaterialStateMainService.createInitMaterialState,
    ),
    state,
  );
};