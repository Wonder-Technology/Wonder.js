open StateDataType;

let _getInitJobHandles = () => [
  ("preget_glslData", PregetGLSLDataJob.execJob),
  ("init_state", InitStateJob.execJob),
  ("init_basic_material", InitBasicMaterialJob.execJob),
  ("init_light_material", InitLightMaterialJob.execJob)
];

let _getRenderJobHandles = () => [
  ("get_render_array", GetRenderArrayJob.execJob),
  ("get_camera_data", GetCameraDataJob.execJob),
  ("clear_color", ClearColorJob.execJob),
  ("clear_buffer", ClearBufferJob.execJob),
  ("clear_last_send_component", ClearLastSendComponentJob.execJob),
  ("send_uniform_shader_data", SendUniformShaderDataJob.execJob),
  ("render_basic", RenderBasicJob.execJob),
  ("front_render_light", FrontRenderLightJob.execJob)
];

let createInitJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getInitJobHandles());

let createRenderJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getRenderJobHandles());