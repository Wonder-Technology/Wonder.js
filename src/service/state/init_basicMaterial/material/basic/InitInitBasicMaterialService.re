open StateInitBasicMaterialType;

open RenderConfigType;

let _getShaderLibItems = ({material_shaders}) => {
  let shaderName = "render_basic";
  JobConfigService.unsafeFindFirst(
    material_shaders,
    shaderName,
    ({name}: material_shader) => JobConfigService.filterTargetName(name, shaderName)
  ).
    shader_libs
};

/* TODO fix light material */
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
          InitShaderInitBasicMaterialService.initMaterialShader,
          BuildShaderSourceInitMaterialService.buildGLSLSource,
          ShaderIndicesService.setShaderIndex,
          _getShaderLibItems
        ),
        (materialRecord, renderConfigRecord, state)
      )
  );

let init = (gl, instanceTuple, {materialRecord} as state) =>
  InitMaterialInitMaterialService.init(gl, instanceTuple, initMaterial, (materialRecord, state));