open StateDataMainType;

let _getMainInitJobHandles = () => [
  ("detect_environment", DetectEnvironmentMainWorkerJob.execJob),
  ("init_imgui", InitIMGUIMainWorkerJob.execJob),
  ("init_event", InitEventMainWorkerJob.execJob),
  ("init_skybox", InitSkyboxMainWorkerJob.execJob),
  ("init_script", InitScriptMainWorkerJob.execJob),
  ("init_camera", InitCameraMainWorkerJob.execJob),
  ("create_worker_instance", CreateWorkerInstanceMainWorkerJob.execJob),
  ("send_job_data", SendJobDataMainWorkerJob.execJob),
  ("create_canvas", CreateCanvasMainWorkerJob.execJob),
  ("set_full_screen", SetFullScreenMainWorkerJob.execJob),
  ("get_finish_send_job_data", GetFinishSendJobDataMainWorkerJob.execJob),
  ("send_init_render_data", SendInitRenderDataMainWorkerJob.execJob),
  (
    "get_finish_init_render_data",
    GetFinishInitRenderDataMainWorkerJob.execJob,
  ),
];

let _getMainLoopJobHandles = () => [
  ("tick", TickMainWorkerJob.execJob),
  ("update_transform", UpdateTransformMainWorkerJob.execJob),
  ("update_camera", UpdateCameraMainWorkerJob.execJob),
  ("update_script", UpdateScriptMainWorkerJob.execJob),
  ("get_camera_data", GetCameraDataMainWorkerJob.execJob),
  (
    "dispose_and_send_dispose_data",
    DisposeAndSendDisposeDataMainWorkerJob.execJob,
  ),
  ("reallocate_cpu_memory", ReallocateCPUMemoryMainWorkerJob.execJob),
  (
    "create_basic_render_object_buffer",
    CreateBasicRenderObjectBufferMainWorkerJob.execJob,
  ),
  (
    "create_light_render_object_buffer",
    CreateLightRenderObjectBufferMainWorkerJob.execJob,
  ),
  ("send_render_data", SendRenderDataMainWorkerJob.execJob),
  ("copy_transform", CopyTransformMainWorkerJob.execJob),
  ("get_finish_render_data", GetFinishRenderDataMainWorkerJob.execJob),
  ("get_finish_dispose_data", GetFinishDisposeDataMainWorkerJob.execJob),
];

let _getWorkerJobHandles = () => [
  ("send_finish_send_job_data", SendFinishSendJobDataRenderWorkerJob.execJob),
  ("get_init_render_data", GetInitRenderDataRenderWorkerJob.execJob),
  ("get_isDebug_data", GetIsDebugDataRenderWorkerJob.execJob),
  ("get_renderConfig_data", GetRenderConfigDataRenderWorkerJob.execJob),
  ("get_setting_data", GetSettingDataRenderWorkerJob.execJob),
  ("get_material_data", GetMaterialDataRenderWorkerJob.execJob),
  ("get_browserDetect_data", GetBrowserDetectDataRenderWorkerJob.execJob),
  ("get_workerDetect_data", GetWorkerDetectDataRenderWorkerJob.execJob),
  ("preget_glslData", PregetGLSLDataRenderWorkerJob.execJob),
  ("create_gl", CreateGlRenderWorkerJob.execJob),
  ("set_viewport", SetViewportRenderWorkerJob.execJob),
  ("detect_gl", DetectGlRenderWorkerJob.execJob),
  ("preget_glslData", PregetGLSLDataRenderWorkerJob.execJob),
  ("init_state", InitStateRenderWorkerJob.execJob),
  ("init_transform", InitTransformRenderWorkerJob.execJob),
  ("init_instance", InitInstanceRenderWorkerJob.execJob),
  ("init_geometry", InitGeometryRenderWorkerJob.execJob),
  ("init_meshRenderer", InitMeshRendererRenderWorkerJob.execJob),
  ("init_no_material_shader", InitNoMaterialShaderRenderWorkerJob.execJob),
  ("init_basic_material", InitBasicMaterialRenderWorkerJob.execJob),
  ("init_direction_light", InitDirectionLightRenderWorkerJob.execJob),
  ("init_point_light", InitPointLightRenderWorkerJob.execJob),
  ("init_light_material", InitLightMaterialRenderWorkerJob.execJob),
  ("init_texture", InitTextureRenderWorkerJob.execJob),
  ("init_imgui", InitIMGUIRenderWorkerJob.execJob),
  (
    "send_finish_init_render_data",
    SendFinishInitRenderDataRenderWorkerJob.execJob,
  ),
  ("get_render_data", GetRenderDataRenderWorkerJob.execJob),
  ("get_instance_data", GetInstanceDataRenderWorkerJob.execJob),
  ("get_geometry_data", GetGeometryDataRenderWorkerJob.execJob),
  ("get_ambient_light_data", GetAmbientLightDataRenderWorkerJob.execJob),
  ("get_direction_light_data", GetDirectionLightDataRenderWorkerJob.execJob),
  ("get_point_light_data", GetPointLightDataRenderWorkerJob.execJob),
  ("init_material_for_render", InitMaterialForRenderRenderWorkerJob.execJob),
  ("init_texture_for_render", InitTextureForRenderRenderWorkerJob.execJob),
  ("clear_color", ClearColorRenderWorkerJob.execJob),
  ("clear_buffer", ClearBufferRenderWorkerJob.execJob),
  (
    "clear_last_send_component",
    ClearLastSendComponentRenderWorkerJob.execJob,
  ),
  (
    "create_basic_render_object_typeArray",
    CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob,
  ),
  (
    "create_light_render_object_typeArray",
    CreateLightRenderObjectBufferTypeArrayRenderWorkerJob.execJob,
  ),
  ("get_custom_data", GetCustomDataRenderWorkerJob.execJob),
  ("get_camera_data", GetCameraDataRenderWorkerJob.execJob),
  ("send_uniform_shader_data", SendUniformShaderDataRenderWorkerJob.execJob),
  ("render_skybox", RenderSkyboxRenderWorkerJob.execJob),
  ("render_basic", RenderBasicRenderWorkerJob.execJob),
  ("front_render_light", FrontRenderLightRenderWorkerJob.execJob),
  ("render_imgui", RenderIMGUIRenderWorkerJob.execJob),
  ("commit", CommitRenderWorkerJob.execJob),
  ("send_finish_render_data", SendFinishRenderDataRenderWorkerJob.execJob),
  ("get_dispose_data", GetDisposeDataRenderWorkerJob.execJob),
  ("dispose_vbo", DisposeVboRenderWorkerJob.execJob),
  ("dispose_sourceInstance", DisposeSourceInstanceRenderWorkerJob.execJob),
  ("dispose_texture", DisposeTextureRenderWorkerJob.execJob),
  ("send_finish_dispose_data", SendFinishDisposeDataRenderWorkerJob.execJob),
];

let createMainInitJobHandleMap = () =>
  HandleJobService.createJobHandleMap(_getMainInitJobHandles());

let createMainLoopJobHandleMap = () =>
  HandleJobService.createJobHandleMap(_getMainLoopJobHandles());

let createWorkerJobHandleMap = () =>
  HandleJobService.createJobHandleMap(_getWorkerJobHandles());

let _getJobHandle = (name, jobHandleMap) =>
  switch (WonderCommonlib.MutableHashMapService.get(name, jobHandleMap)) {
  | None => JobService.handleGetNoneWorkerJob(name, jobHandleMap)
  | Some(handleFunc) => handleFunc
  };

let getMainInitJobHandle = (name, jobHandleMap) =>
  _getJobHandle(name, jobHandleMap);

let getMainLoopJobHandle = (name, jobHandleMap) =>
  _getJobHandle(name, jobHandleMap);

let getWorkerJobHandle = (name, jobHandleMap) =>
  _getJobHandle(name, jobHandleMap);