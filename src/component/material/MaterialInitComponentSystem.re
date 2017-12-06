open StateDataType;

let _initMaterialShader = (gl, materialIndex: int, initShaderFuncTuple, state: StateDataType.state) => {
  open RenderConfigSystem;
  let {basic_material} as shaderData = getShaders(state);
  let shader_libs = basic_material.material_shader.shader_libs;
  let shaderLibs = getShaderLibs(state);
  let gameObject = MaterialGameObjectSystem.unsafeGetGameObject(materialIndex, state);
  MaterialShaderIndexSystem.hasShaderIndex(materialIndex, state) ?
    state :
    {
      let shaderIndex =
        ShaderSystem.initMaterialShader(
          gl,
          materialIndex,
          getMaterialShaderLibDataArr(shaderData, gameObject, shader_libs, shaderLibs, state),
          initShaderFuncTuple,
          state
        );
      MaterialShaderIndexSystem.setShaderIndex(materialIndex, shaderIndex, state)
    }
};

let _buildInitShaderFuncTuple = () => ShaderSourceBuildSystem.buildGLSLSource;

let initMaterial = (gl, materialIndex: int, state: state) =>
  _initMaterialShader(gl, materialIndex, _buildInitShaderFuncTuple(), state);

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  initMaterial(gl, index, state);