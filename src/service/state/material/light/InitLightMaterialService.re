open StateDataType;

open MaterialType;

open RenderConfigType;

open LightMaterialType;

let _getShaderLibs = ({material_shaders}) => {
  let shaderName = "front_render_light";
  JobConfigService.unsafeFindFirst(
    material_shaders,
    shaderName,
    ({name}: material_shader) => JobConfigService.filterTargetName(name, shaderName)
  ).
    shader_libs
};

let _getShaderTuple = (materialIndex, state: StateDataType.state) => {
  let shaderRecord = RenderConfigService.getShaders(state);
  (materialIndex, _getShaderLibs(shaderRecord), shaderRecord)
};

let _getStateTuple = ({lightMaterialRecord} as state) => {
  let {gameObjectMap, shaderIndexMap} = lightMaterialRecord;
  (gameObjectMap, shaderIndexMap, state)
};

let initMaterial =
  [@bs]
  (
    (gl, materialIndex: int, state: StateDataType.state) =>
      InitMaterialService.initMaterial(
        gl,
        _getShaderTuple(materialIndex, state),
        ShaderIndexLightMaterialService.setShaderIndex,
        _getStateTuple(state)
      )
  );

let initMaterials = (materialIndexArr, gl, state: StateDataType.state) =>
  materialIndexArr
  |> ArraySystem.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterial(gl, materialIndex, state)),
       state
     );

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  InitMaterialService.handleInitComponent(
    gl,
    _getShaderTuple(index, state),
    ShaderIndexLightMaterialService.setShaderIndex,
    _getStateTuple(state)
  );

let init = (gl, {lightMaterialRecord} as state) => {
  let {index, disposedIndexArray} = lightMaterialRecord;
  InitMaterialService.init(gl, (index, disposedIndexArray), initMaterial, state)
};