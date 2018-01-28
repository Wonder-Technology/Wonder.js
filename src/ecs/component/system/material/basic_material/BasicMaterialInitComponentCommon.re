open RenderJobConfigType;

open MaterialType;

open BasicMaterialType;

let _getShaderLibs = (shaderData) => shaderData.basic_material.material_shader.shader_libs;

let _getShaderTuple = (materialIndex, state: StateDataType.state) => {
  let shaderData = RenderJobConfigSystem.getShaders(state);
  (materialIndex, _getShaderLibs(shaderData), shaderData)
};

let _getStateTuple = (state: StateDataType.state) => {
  let {gameObjectMap, shaderIndexMap} = BasicMaterialStateCommon.getMaterialData(state);
  (gameObjectMap, shaderIndexMap, state)
};

let initMaterial =
  [@bs]
  (
    (gl, materialIndex: int, state: StateDataType.state) =>
      MaterialInitComponentCommon.initMaterial(
        gl,
        _getShaderTuple(materialIndex, state),
        BasicMaterialShaderIndexCommon.setShaderIndex,
        _getStateTuple(state)
      )
  );

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  MaterialInitComponentCommon.handleInitComponent(
    gl,
    _getShaderTuple(index, state),
    BasicMaterialShaderIndexCommon.setShaderIndex,
    _getStateTuple(state)
  );