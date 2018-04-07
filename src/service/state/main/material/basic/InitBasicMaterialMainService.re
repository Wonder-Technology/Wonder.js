open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
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
               isSupportInstance
             ),
             state
           )
       ),
       CreateInitMaterialStateMainService.createInitMaterialState(state)
     )
  |> ignore;
  state
};

let handleInitComponent = (gl, index: int, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  [@bs]
  InitBasicMaterialInitMaterialService.initMaterial(
    gl,
    (
      index,
      JudgeInstanceMainService.isSourceInstance(index, gameObjectMap, gameObjectRecord),
      isSupportInstance
    ),
    CreateInitMaterialStateMainService.createInitMaterialState(state)
  )
  |> ignore;
  state
};