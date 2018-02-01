open StateDataType;

let _getInitJobHandles = () => [
  ("preget_glslData", PregetGLSLDataJob.getJob),
  ("init_basic_material", InitBasicMaterialJob.getJob),
  ("init_light_material", InitLightMaterialJob.getJob)
];

let _getRenderJobHandles = () => [
  ("get_render_array", GetRenderArrayJob.getJob),
  ("get_camera_data", GetCameraDataJob.getJob),
  ("clear_color", ClearColorJob.getJob),
  ("clear_buffer", ClearBufferJob.getJob),
  ("clear_last_send_component", ClearLastSendComponentJob.getJob),
  ("send_uniform_shader_data", SendUniformShaderDataJob.getJob),
  ("render_basic", RenderBasicJob.getJob),
  ("front_render_light", FrontRenderLightJob.getJob)
];

let createInitJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getInitJobHandles());

let createRenderJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getRenderJobHandles());