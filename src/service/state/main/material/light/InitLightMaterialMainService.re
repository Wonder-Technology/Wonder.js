open StateDataMainType;

open MaterialType;

open LightMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordLightMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray, shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, materialIndex: int) =>
           [@bs]
           InitInitLightMaterialService.initMaterial(
             gl,
             (
               materialIndex,
               JudgeInstanceMainService.isSourceInstance(
                 materialIndex,
                 gameObjectMap,
                 gameObjectRecord
               ),
               isSupportInstance
             ),
             state
           )
       ),
       CreateInitLightMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray, shaderIndices),
         state
       )
     )
  |> ignore;
  state
};

let handleInitComponent = (gl, materialIndex: int, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordLightMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray, shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  [@bs]
  InitInitLightMaterialService.initMaterial(
    gl,
    (
      materialIndex,
      JudgeInstanceMainService.isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord),
      isSupportInstance
    ),
    CreateInitLightMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};