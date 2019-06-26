open StateInitLightMaterialType;

open InitMaterialLightMaterialType;

open AllRenderConfigType;

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
    InitMaterialInitMaterialAllService.initMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitLightMaterialService.initMaterialShader,
        BuildShaderSourceInitShaderAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitLightMaterialService.getMaterialShaderLibDataArr,
      ),
      (materialRecord.shaderIndices, renderConfigRecord, state),
    );

let reInitMaterial =
  (. gl, dataTuple, {materialRecord, renderConfigRecord} as state) =>
    InitMaterialInitMaterialAllService.reInitMaterial(
      gl,
      dataTuple,
      (
        InitShaderInitLightMaterialService.reInitMaterialShader,
        BuildShaderSourceInitShaderAllService.buildGLSLSource,
        ShaderIndicesService.setShaderIndex,
        _getShaderLibItems,
        GetShaderLibDataArrayInitLightMaterialService.getMaterialShaderLibDataArr,
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