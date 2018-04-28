open StateInitLightMaterialType;

open RenderConfigType;

let _getShaderLibItems = ({materialShaders}) => {
  let shaderName = "front_render_light";
  JobConfigService.unsafeFindFirst(
    materialShaders,
    shaderName,
    ({name}: material_shader) => JobConfigService.filterTargetName(name, shaderName)
  ).
    shaderLibs
};

let isNeedInitMaterial = (materialIndex, shaderIndices) =>
  ! ShaderIndicesService.hasShaderIndex(materialIndex, shaderIndices);

let initMaterial =
  [@bs]
  (
    (gl, dataTuple, {materialRecord, renderConfigRecord} as state) =>
      InitMaterialInitMaterialService.initMaterial(
        gl,
        dataTuple,
        (
          InitShaderInitLightMaterialService.initMaterialShader,
          BuildShaderSourceInitMaterialService.buildGLSLSource,
          ShaderIndicesService.setShaderIndex,
          _getShaderLibItems
        ),
        (materialRecord, renderConfigRecord, state)
      )
  );

let init = (gl, instanceTuple, {materialRecord} as state) =>
  InitMaterialInitMaterialService.init(gl, instanceTuple, initMaterial, (materialRecord, state));