open StateInitMaterialType;

open MaterialInitMaterialType;

let _initMaterialShader =
    (
      gl,
      (materialIndex: int, isSourceInstance, isSupportInstance),
      (buildGLSLSourceFunc, setShaderIndexFunc, getShaderLibItemsFunc),
      {materialRecord, renderConfigRecord} as state
    ) =>
  ShaderIndicesService.hasShaderIndex(materialIndex, materialRecord.shaderIndices) ?
    () :
    {
      let shaders = RenderConfigInitMaterialService.getShaders(renderConfigRecord);
      [@bs]
      setShaderIndexFunc(
        materialIndex,
        InitShaderInitMaterialService.initMaterialShader(
          materialIndex,
          (
            gl,
            RenderConfigInitMaterialService.getMaterialShaderLibDataArr(
              isSourceInstance,
              isSupportInstance,
              (
                shaders,
                getShaderLibItemsFunc(shaders),
                RenderConfigInitMaterialService.getShaderLibs(renderConfigRecord)
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
      ()
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