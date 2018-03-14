open MainStateDataType;

open RenderConfigType;

let _initMaterialShader =
    (
      gl,
      (materialIndex: int, shaderLibs, shaderRecord),
      (initShaderFuncTuple, setShaderIndexFunc),
      (gameObjectMap, shaderIndexMap, state: MainStateDataType.state)
    ) =>
  ShaderIndexMapService.hasShaderIndex(materialIndex, shaderIndexMap) ?
    state :
    [@bs]
    setShaderIndexFunc(
      materialIndex,
      InitShaderMainService.initMaterialShader(
        materialIndex,
        (
          gl,
          RenderConfigMainService.getMaterialShaderLibDataArr(
            GameObjectMapService.unsafeGetGameObject(materialIndex, gameObjectMap),
            (shaderRecord, shaderLibs, RenderConfigMainService.getShaderLibs(state)),
            state
          )
        ),
        initShaderFuncTuple,
        state
      ),
      state
    );

/* let _buildInitShaderFuncTuple = () => BuildShaderSourceMainService.buildGLSLSource; */
let initMaterial = (gl, shaderTuple, setShaderIndexFunc, stateTuple) =>
  _initMaterialShader(
    gl,
    shaderTuple,
    (BuildShaderSourceMainService.buildGLSLSource, setShaderIndexFunc),
    stateTuple
  );

let handleInitComponent = (gl, shaderTuple, setShaderIndexFunc, stateTuple) =>
  initMaterial(gl, shaderTuple, setShaderIndexFunc, stateTuple);

let init = (gl, (index, disposedIndexArray), initMaterialFunc, state: MainStateDataType.state) => {
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
              () => DisposeMaterialService.isNotDisposed(disposedIndexArray) |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  ArraySystem.range(0, index - 1)
  |> ArraySystem.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterialFunc(gl, materialIndex, state)),
       state
     )
};