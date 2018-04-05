open MaterialType;

open BasicMaterialType;

let _getRecordTuple =
    (
      {
        gameObjectRecord,
        directionLightRecord,
        pointLightRecord,
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord
      } as state
    ) => (
  directionLightRecord.index,
  pointLightRecord.index,
  shaderIndices,
  RecordRenderConfigMainService.getRecord(state),
  shaderRecord,
  programRecord,
  glslRecord,
  glslSenderRecord,
  glslLocationRecord,
  glslChunkRecord
);

let initMaterials =
    (
      materialIndexArr,
      gl,
      {
        gameObjectRecord,
        directionLightRecord,
        pointLightRecord,
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord
      } as state
    ) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (recordTuple, materialIndex: int) =>
           [@bs]
           InitBasicMaterialAllService.initMaterial(
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
             recordTuple
           )
       ),
       _getRecordTuple(state)
     )
};

let handleInitComponent = (gl, index: int, state) => {
  let gameObjectMap = RecordBasicMaterialMainService.getRecord(state).gameObjectMap;
  [@bs]
  InitBasicMaterialAllService.initMaterial(
    gl,
    (
      materialIndex,
      JudgeInstanceMainService.isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    _getRecordTuple(state)
  )
};