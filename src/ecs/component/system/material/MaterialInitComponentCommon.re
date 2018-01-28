open StateDataType;

open RenderJobConfigType;

let _initMaterialShader =
    (
      gl,
      (materialIndex: int, shaderLibs, shaderData),
      (initShaderFuncTuple, setShaderIndexFunc),
      (gameObjectMap, shaderIndexMap, state: StateDataType.state)
    ) =>
  RenderJobConfigSystem.(
    MaterialShaderIndexCommon.hasShaderIndex(materialIndex, shaderIndexMap) ?
      state :
      [@bs]
      setShaderIndexFunc(
        materialIndex,
        ShaderSystem.initMaterialShader(
          materialIndex,
          (
            gl,
            getMaterialShaderLibDataArr(
              MaterialGameObjectCommon.unsafeGetGameObject(materialIndex, gameObjectMap),
              (shaderData, shaderLibs, getShaderLibs(state)),
              state
            )
          ),
          initShaderFuncTuple,
          state
        ),
        state
      )
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