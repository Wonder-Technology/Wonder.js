open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let initMaterials = (materialIndexArr, gl, state) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, materialIndex: int) =>
           [@bs]
           InitBasicMaterialInitMaterialService.initMaterial(
             gl,
             (
               materialIndex,
               JudgeInstanceMainService.isSourceInstance(
                 materialIndex,
                 gameObjectMap,
                 gameObjectRecord
               ),
               JudgeInstanceMainService.isSupportInstance(state)
             ),
             state
           )
       ),
       CreateRenderStateMainService.createRenderState(state)
     )
};

let handleInitComponent = (gl, index: int, state) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  [@bs]
  InitBasicMaterialInitMaterialService.initMaterial(
    gl,
    (
      materialIndex,
      JudgeInstanceMainService.isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    CreateRenderStateMainService.createRenderState(state)
  )
};