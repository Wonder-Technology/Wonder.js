open MainStateDataType;

let _getInitJobHandles = () => [
  ("create_canvas", CreateCanvasJob.execJob),
  ("create_gl", CreateGlJob.execJob),
  ("set_full_screen", SetFullScreenJob.execJob),
  ("set_viewport", SetViewportJob.execJob),
  ("detect_gl", DetectGlJob.execJob),
  ("init_camera", InitCameraJob.execJob),
  ("init_boxGeometry", InitBoxGeometryJob.execJob),
  ("start_time", StartTimeJob.execJob),
  ("preget_glslData", PregetGLSLDataJob.execJob),
  ("init_state", InitStateJob.execJob),
  ("init_basic_material", InitBasicMaterialJob.execJob),
  ("init_light_material", InitLightMaterialJob.execJob)
];

let _getLoopJobHandles = () => [
  ("tick", TickJob.execJob),
  ("update_camera", UpdateCameraJob.execJob),
  ("clear_color", ClearColorJob.execJob),
  ("clear_buffer", ClearBufferJob.execJob),
  ("clear_last_send_component", ClearLastSendComponentJob.execJob),
  ("get_camera_data", GetCameraDataJob.execJob),
  ("send_uniform_shader_data", SendUniformShaderDataJob.execJob),
  ("create_basic_render_object_buffer", CreateBasicRenderObjectBufferJob.execJob),
  ("create_light_render_object_buffer", CreateLightRenderObjectBufferJob.execJob),
  ("render_basic", RenderBasicJob.execJob),
  ("front_render_light", FrontRenderLightJob.execJob)
];

let createInitJobHandleMap = () => HandleJobService.createJobHandleMap(_getInitJobHandles());

let createLoopJobHandleMap = () => HandleJobService.createJobHandleMap(_getLoopJobHandles());