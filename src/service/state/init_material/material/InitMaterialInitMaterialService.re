let _initMaterialShader =
    (
      gl,
      (materialIndex: int, isSourceInstance, isSupportInstance),
      (
        initMaterialShaderFunc,
        buildGLSLSourceFunc,
        setShaderIndexFunc,
        getShaderLibItemsFunc,
        getMaterialShaderLibDataArrFunc
      ),
      (shaderIndices, renderConfigRecord, state)
    ) => {
  let shaders = GetDataRenderConfigService.getShaders(renderConfigRecord);
  [@bs]
  setShaderIndexFunc(
    materialIndex,
    initMaterialShaderFunc(
      materialIndex,
      (
        gl,
        [@bs]
        getMaterialShaderLibDataArrFunc(
          materialIndex,
          (isSourceInstance, isSupportInstance),
          (
            shaders,
            getShaderLibItemsFunc(shaders),
            GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
          ),
          state
        )
      ),
      buildGLSLSourceFunc,
      state
    ),
    shaderIndices
  )
  |> ignore;
  state
};

let initMaterial = (gl, dataTuple, funcTuple, stateTuple) =>
  _initMaterialShader(gl, dataTuple, funcTuple, stateTuple);

let init =
    (gl, (isSourceInstanceMap, isSupportInstance), initMaterialFunc, (index, disposedIndexArray, state)) => {
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
                DisposeMaterialService.isNotDisposed(disposedIndexArray)
                |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  ArrayService.range(0, index - 1)
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
       state
     )
};