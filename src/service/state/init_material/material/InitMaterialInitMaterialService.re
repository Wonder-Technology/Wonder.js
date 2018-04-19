open StateInitMaterialType;

open InitMaterialMaterialType;

let _initMaterialShader =
    (
      gl,
      (materialIndex: int, isSourceInstance, isSupportInstance),
      (buildGLSLSourceFunc, setShaderIndexFunc, getShaderLibItemsFunc),
      {materialRecord, renderConfigRecord} as state
    ) => {
  let shaders = GetDataRenderConfigService.getShaders(renderConfigRecord);
  [@bs]
  setShaderIndexFunc(
    materialIndex,
    InitShaderInitMaterialService.initMaterialShader(
      materialIndex,
      (
        gl,
        GetDataRenderConfigService.getMaterialShaderLibDataArr(
          isSourceInstance,
          isSupportInstance,
          (
            shaders,
            getShaderLibItemsFunc(shaders),
            GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
          )
        )
      ),
      buildGLSLSourceFunc,
      /* (
           directionLightIn,ex
           pointLightRecord,
           shaderRecord,
           programRecord,
           glslRecord,
           glslSenderRecord,
           glslLocationRecord,
           glslChunkRecord
         ) */
      state
    ),
    materialRecord.shaderIndices
  )
  |> ignore;
  state
};

let initMaterial = (gl, dataTuple, funcTuple, state) =>
  _initMaterialShader(gl, dataTuple, funcTuple, state);

let init =
    (gl, (isSourceInstanceMap, isSupportInstance), initMaterialFunc, {materialRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not dispose any material before init|j},
                ~actual={j|do|j}
              ),
              () =>
                DisposeMaterialService.isNotDisposed(materialRecord.disposedIndexArray)
                |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  ArrayService.range(0, materialRecord.index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, materialIndex: int) =>
           [@bs]
           initMaterialFunc(
             gl,
             (
               materialIndex,
               isSourceInstanceMap |> JudgeInstanceService.unsafeGetIsSourceInstance(materialIndex),
               isSupportInstance
             ),
             state
           )
       ),
       /* (
            directionLightRecord,
            pointLightRecord,
            shaderIndices,
            renderConfigRecord,
            shaderRecord,
            programRecord,
            glslRecord,
            glslSenderRecord,
            glslLocationRecord,
            glslChunkRecord
          ) */
       state
     )
};