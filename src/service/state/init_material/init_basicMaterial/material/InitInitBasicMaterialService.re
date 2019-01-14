open StateInitBasicMaterialType;

open InitMaterialBasicMaterialType;

open RenderConfigType;

let _getShaderLibItems = ({materialShaders}) => {
  let shaderName = "render_basic";

  ArrayService.unsafeFindFirst(
    materialShaders, shaderName, ({name}: material_shader) =>
    name === shaderName
  ).
    shaderLibs;
};

let isNeedInitMaterial = (materialIndex, shaderIndices) =>
  ! ShaderIndicesService.hasShaderIndex(materialIndex, shaderIndices);

let initMaterial =
  (. gl, dataTuple, {materialRecord, renderConfigRecord} as state) =>
    InitMaterialInitMaterialService.initMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitBasicMaterialService.initMaterialShader,
        BuildShaderSourceAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitBasicMaterialService.getMaterialShaderLibDataArr,
      ),
      (materialRecord.shaderIndices, renderConfigRecord, state),
    );

let reInitMaterial =
  (. gl, dataTuple, {materialRecord, renderConfigRecord} as state) =>
    InitMaterialInitMaterialService.reInitMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitBasicMaterialService.reInitMaterialShader,
        BuildShaderSourceAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitBasicMaterialService.getMaterialShaderLibDataArr,
      ),
      (materialRecord.shaderIndices, renderConfigRecord, state),
    );

let init = (gl, instanceTuple, {materialRecord} as state) => {
  let {index, disposedIndexArray} = materialRecord;
  InitMaterialInitMaterialService.init(
    gl,
    instanceTuple,
    initMaterial,
    (index, disposedIndexArray, state),
  );
};