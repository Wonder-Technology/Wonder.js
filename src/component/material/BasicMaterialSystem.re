open RenderConfigSystem;

open StateDataType;

open MaterialSystem;

open GlType;

let buildInitShaderFuncTuple = () => ShaderSourceBuildSystem.buildGLSLSource;

let initMaterialShaders = (gl, state: state) : state => {
  let {basic_material} = getShaders(state);
  MaterialSystem.initMaterialShaders(gl, basic_material, buildInitShaderFuncTuple(), state)
};

let init = (gl, state: state) => state |> initMaterialShaders(gl);
/* let init = (state: StateDataType.state) => state; */