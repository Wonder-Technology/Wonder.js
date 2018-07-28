open StateInitLightMaterialType;

open InitMaterialLightMaterialType;

open RenderConfigType;

let _getShaderLibItems = ({materialShaders}) => {
  let shaderName = "front_render_light";
  JobConfigService.unsafeFindFirst(
    materialShaders, shaderName, ({name}: material_shader) =>
    JobConfigService.filterTargetName(name, shaderName)
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
        BuildShaderSourceInitMaterialService.buildGLSLSource,
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
        BuildShaderSourceInitMaterialService.buildGLSLSource,
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