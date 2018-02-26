open StateDataType;

open RenderConfigDataType;

let _initMaterialShader =
    (
      gl,
      (materialIndex: int, shaderLibs, shaderData),
      (initShaderFuncTuple, setShaderIndexFunc),
      (gameObjectMap, shaderIndexMap, state: StateDataType.state)
    ) =>
  MaterialShaderIndexCommon.hasShaderIndex(materialIndex, shaderIndexMap) ?
    state :
    [@bs]
    setShaderIndexFunc(
      materialIndex,
      ShaderSystem.initMaterialShader(
        materialIndex,
        (
          gl,
          RenderConfigDataSystem.getMaterialShaderLibDataArr(
            MaterialGameObjectCommon.unsafeGetGameObject(materialIndex, gameObjectMap),
            (shaderData, shaderLibs, RenderConfigDataSystem.getShaderLibs(state)),
            state
          )
        ),
        initShaderFuncTuple,
        state
      ),
      state
    );

/* let _buildInitShaderFuncTuple = () => ShaderSourceBuildCommon.buildGLSLSource; */
let initMaterial = (gl, shaderTuple, setShaderIndexFunc, stateTuple) =>
  _initMaterialShader(
    gl,
    shaderTuple,
    (ShaderSourceBuildCommon.buildGLSLSource, setShaderIndexFunc),
    stateTuple
  );

let handleInitComponent = (gl, shaderTuple, setShaderIndexFunc, stateTuple) =>
  initMaterial(gl, shaderTuple, setShaderIndexFunc, stateTuple);