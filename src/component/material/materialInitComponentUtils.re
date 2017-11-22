open MaterialType;

open MaterialStateUtils;

open RenderConfigSystem;

open StateDataType;

let _initMaterialShader =
    (
      gl,
      materialIndex: int,
      /* gameObjectUid, */
      /* {shader_libs}: material_shader, */
      /* attributeLocationMap,
         uniformLocationMap, */
      initShaderFuncTuple,
      state: StateDataType.state
    ) => {
  open RenderConfigSystem;
  let {basic_material} = getShaders(state);
  let shader_libs = basic_material.material_shader.shader_libs;
  let {groups} = getShaders(state);
  let shaderLibs = getShaderLibs(state);
  /* let gameObject = Js.Option.getExn(getGameObject(materialIndex, state)); */
  /* let geometry = Js.Option.getExn(GameObjectComponentUtils.getGeometryComponent(gameObjectUid, state)); */
  let shaderIndex =
    ShaderSystem.initMaterialShader(
      gl,
      materialIndex,
      /* geometry, */
      /* gameObject, */
      getMaterialShaderLibDataArr(materialIndex, groups, shader_libs, shaderLibs),
      /* attributeLocationMap,
         uniformLocationMap, */
      initShaderFuncTuple,
      state
    );
  MaterialShaderIndexUtils.setShaderIndex(materialIndex, shaderIndex, state)
};

let _buildInitShaderFuncTuple = () => ShaderSourceBuildSystem.buildGLSLSource;

let initMaterial = (gl, materialIndex: int, state: state) =>
  _initMaterialShader(gl, materialIndex, _buildInitShaderFuncTuple(), state);

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  initMaterial(gl, index, state);