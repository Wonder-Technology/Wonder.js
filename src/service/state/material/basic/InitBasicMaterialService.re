open StateDataType;

open RenderConfigType;

open MaterialType;

open BasicMaterialType;

let _getShaderLibs = ({material_shaders}) => {
  let shaderName = "render_basic";
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

let _getStateTuple = ({basicMaterialRecord} as state) => {
  let {gameObjectMap, shaderIndexMap} = basicMaterialRecord;
  (gameObjectMap, shaderIndexMap, state)
};

let initMaterial =
  [@bs]
  (
    (gl, materialIndex: int, state: StateDataType.state) =>
      InitMaterialService.initMaterial(
        gl,
        _getShaderTuple(materialIndex, state),
        ShaderIndexBasicMaterialService.setShaderIndex,
        _getStateTuple(state)
      )
  );

let initMaterials = (materialIndexArr, gl, state: StateDataType.state) =>
  materialIndexArr
  |> ArraySystem.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterial(gl,materialIndex,  state)),
       state
     );

let handleInitComponent = (gl, index: int, state: StateDataType.state) =>
  InitMaterialService.handleInitComponent(
    gl,
    _getShaderTuple(index, state),
    ShaderIndexBasicMaterialService.setShaderIndex,
    _getStateTuple(state)
  );

let init = (gl, {basicMaterialRecord} as state) => {
  let {index, disposedIndexArray} = basicMaterialRecord;
  InitMaterialService.init(
    gl,
    (index, disposedIndexArray),
    initMaterial,
    state
  )
};