open StateDataType;

let _initMaterialShader = (gl, materialIndex: int, initShaderFuncTuple, state: StateDataType.state) => {
  open RenderConfigSystem;
  let {basic_material} = getShaders(state);
  let shader_libs = basic_material.material_shader.shader_libs;
  let {groups} = getShaders(state);
  let shaderLibs = getShaderLibs(state);
  let materialIndexStr = Js.Int.toString(materialIndex);
  MaterialShaderIndexUtils.hasShaderIndex(materialIndexStr, state) ?
    state :
    {
      let shaderIndex =
        ShaderSystem.initMaterialShader(
          gl,
          materialIndex,
          getMaterialShaderLibDataArr(groups, shader_libs, shaderLibs),
          initShaderFuncTuple,
          state
        );
      MaterialShaderIndexUtils.setShaderIndex(materialIndexStr, shaderIndex, state)
    }
};

let _buildInitShaderFuncTuple = () => ShaderSourceBuildSystem.buildGLSLSource;

let initMaterial = (gl, materialIndex: int, state: state) =>
  _initMaterialShader(gl, materialIndex, _buildInitShaderFuncTuple(), state);

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  initMaterial(gl, index, state);