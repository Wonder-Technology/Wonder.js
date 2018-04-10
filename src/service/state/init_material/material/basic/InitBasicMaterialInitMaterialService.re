open InitMaterialInitMaterialService;

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

let initMaterial =
  [@bs]
  (
    (gl, dataTuple, state) =>
      InitMaterialInitMaterialService.initMaterial(
        gl,
        dataTuple,
        (
          BuildShaderSourceInitMaterialService.buildGLSLSource,
          ShaderIndicesService.setShaderIndex,
          _getShaderLibItems
        ),
        state
      )
  );

let init = (gl, instanceTuple, state) =>
  InitMaterialInitMaterialService.init(gl, instanceTuple, initMaterial, state);