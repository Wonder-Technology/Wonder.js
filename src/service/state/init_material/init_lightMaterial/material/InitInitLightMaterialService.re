open StateInitLightMaterialType;

open InitMaterialLightMaterialType;

open RenderConfigType;

let _getShaderLibItems = ({materialShaders}) => {
  let shaderName = "front_render_light";

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
        InitShaderInitLightMaterialService.initMaterialShader,
        BuildShaderSourceAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitLightMaterialService.getMaterialShaderLibDataArr,
      ),
      (materialRecord.shaderIndices, renderConfigRecord, state),
    );

let reInitMaterial =
  (. gl, dataTuple, {materialRecord, renderConfigRecord} as state) =>
    InitMaterialInitMaterialService.reInitMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitLightMaterialService.reInitMaterialShader,
        BuildShaderSourceAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitLightMaterialService.getMaterialShaderLibDataArr,
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