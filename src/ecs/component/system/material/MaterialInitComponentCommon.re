open StateDataType;

open RenderJobConfigType;

let _initMaterialShader = (gl, materialIndex: int, initShaderFuncTuple, state: StateDataType.state) => {
  open RenderJobConfigSystem;
  let {basic_material} as shaderData = getShaders(state);
  let shader_libs = basic_material.material_shader.shader_libs;
  let shaderLibs = getShaderLibs(state);
  let gameObject = MaterialGameObjectCommon.unsafeGetGameObject(materialIndex, state);
  MaterialShaderIndexCommon.hasShaderIndex(materialIndex, state) ?
    state :
    {
      let shaderIndex =
        ShaderSystem.initMaterialShader(
          materialIndex,
          (
            gl,
            getMaterialShaderLibDataArr(gameObject, (shaderData, shader_libs, shaderLibs), state)
          ),
          initShaderFuncTuple,
          state
        );
      MaterialShaderIndexCommon.setShaderIndex(materialIndex, shaderIndex, state)
    }
};

let _buildInitShaderFuncTuple = () => ShaderSourceBuildCommon.buildGLSLSource;

let initMaterial = (gl, materialIndex: int, state: state) =>
  _initMaterialShader(gl, materialIndex, _buildInitShaderFuncTuple(), state);

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  initMaterial(gl, index, state);