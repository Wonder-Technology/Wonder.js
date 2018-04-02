open MainStateDataType;

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

let _getShaderTuple = (materialIndex, state: MainStateDataType.state) => {
  let shaderRecord = RenderConfigMainService.getShaders(state);
  (materialIndex, _getShaderLibs(shaderRecord), shaderRecord)
};

let _getStateTuple = (state) => {
  let {gameObjectMap, shaderIndices} = state |> RecordBasicMaterialMainService.getRecord;
  (gameObjectMap, shaderIndices, state)
};

let initMaterial =
  [@bs]
  (
    (gl, materialIndex: int, state: MainStateDataType.state) =>
      InitMaterialMainService.initMaterial(
        gl,
        _getShaderTuple(materialIndex, state),
        ShaderIndexBasicMaterialMainService.setShaderIndex,
        _getStateTuple(state)
      )
  );

let initMaterials = (materialIndexArr, gl, state: MainStateDataType.state) =>
  materialIndexArr
  |> ReduceStateMainService.reduceState(
       [@bs] ((state, materialIndex: int) => [@bs] initMaterial(gl, materialIndex, state)),
       state
     );

let handleInitComponent = (gl, index: int, state: MainStateDataType.state) =>
  InitMaterialMainService.handleInitComponent(
    gl,
    _getShaderTuple(index, state),
    ShaderIndexBasicMaterialMainService.setShaderIndex,
    _getStateTuple(state)
  );

let init = (gl, state) => {
  let {index, disposedIndexArray} = state |> RecordBasicMaterialMainService.getRecord;
  InitMaterialMainService.init(gl, (index, disposedIndexArray), initMaterial, state)
};