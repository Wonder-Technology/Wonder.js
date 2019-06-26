open StateInitBasicMaterialType;

open InitMaterialBasicMaterialType;

open AllRenderConfigType;

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
    InitMaterialInitMaterialAllService.initMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitBasicMaterialService.initMaterialShader,
        BuildShaderSourceInitShaderAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitBasicMaterialService.getMaterialShaderLibDataArr,
      ),
      (materialRecord.shaderIndices, renderConfigRecord, state),
    );

let reInitMaterial =
  (. gl, dataTuple, {materialRecord, renderConfigRecord} as state) =>
    InitMaterialInitMaterialAllService.reInitMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitBasicMaterialService.reInitMaterialShader,
        BuildShaderSourceInitShaderAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitBasicMaterialService.getMaterialShaderLibDataArr,
      ),
      (materialRecord.shaderIndices, renderConfigRecord, state),
    );

let init = (gl, instanceTuple, {materialRecord} as state) => {
  let {index, disposedIndexArray} = materialRecord;
  InitMaterialInitMaterialAllService.init(
    gl,
    instanceTuple,
    initMaterial,
    (index, disposedIndexArray, state),
  );
};