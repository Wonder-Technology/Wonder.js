open StateDataType;

open RenderConfigType;

let _initMaterialShader =
    (
      gl,
      (materialIndex: int, shaderLibs, shaderRecord),
      (initShaderFuncTuple, setShaderIndexFunc),
      (gameObjectMap, shaderIndexMap, state: StateDataType.state)
    ) =>
  ShaderIndexMapService.hasShaderIndex(materialIndex, shaderIndexMap) ?
    state :
    [@bs]
    setShaderIndexFunc(
      materialIndex,
      InitShaderService.initMaterialShader(
        materialIndex,
        (
          gl,
          RenderConfigService.getMaterialShaderLibDataArr(
            GameObjectMapService.unsafeGetGameObject(materialIndex, gameObjectMap),
            (shaderRecord, shaderLibs, RenderConfigService.getShaderLibs(state)),
            state
          )
        ),
        initShaderFuncTuple,
        state
      ),
      state
    );

/* let _buildInitShaderFuncTuple = () => BuildShaderSourceService.buildGLSLSource; */
let initMaterial = (gl, shaderTuple, setShaderIndexFunc, stateTuple) =>
  _initMaterialShader(
    gl,
    shaderTuple,
    (BuildShaderSourceService.buildGLSLSource, setShaderIndexFunc),
    stateTuple
  );

let handleInitComponent = (gl, shaderTuple, setShaderIndexFunc, stateTuple) =>
  initMaterial(gl, shaderTuple, setShaderIndexFunc, stateTuple);

let init = (gl, (index, disposedIndexArray), initMaterialFunc, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  ArraySystem.range(0, index - 1)
  |> ArraySystem.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterialFunc(gl, materialIndex, state)),
       state
     )
};