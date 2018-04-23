open StateInitLightMaterialType;

open RenderConfigType;

let _getShaderLibItems = ({material_shaders}) => {
  let shaderName = "front_render_light";
  JobConfigService.unsafeFindFirst(
    material_shaders,
    shaderName,
    ({name}: material_shader) => JobConfigService.filterTargetName(name, shaderName)
  ).
    shader_libs
};

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