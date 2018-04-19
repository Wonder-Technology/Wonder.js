open StateDataMainType;

let _getMainInitJobHandles = () => [
  ("create_worker_instance", CreateWorkerInstanceMainWorkerJob.execJob),
  ("send_job_data", SendJobDataMainWorkerJob.execJob),
  ("get_finish_send_job_data", GetFinishSendJobDataMainWorkerJob.execJob),
  ("send_init_render_data", SendInitRenderDataMainWorkerJob.execJob),
  ("get_finish_init_render_data", GetFinishInitRenderDataMainWorkerJob.execJob)
];

let _getMainLoopJobHandles = () => [
  ("tick", TickMainWorkerJob.execJob),
  ("update_transform", UpdateTransformMainWorkerJob.execJob),
  ("update_camera", UpdateCameraMainWorkerJob.execJob),
  ("get_camera_data", GetCameraDataMainWorkerJob.execJob),
  ("dispose_and_send_dispose_data", DisposeAndSendDisposeDataMainWorkerJob.execJob),
  ("create_basic_render_object_buffer", CreateBasicRenderObjectBufferMainWorkerJob.execJob),
  ("send_render_data", SendRenderDataMainWorkerJob.execJob),
  ("copy_transform", CopyTransformMainWorkerJob.execJob),
  ("get_finish_render_data", GetFinishRenderDataMainWorkerJob.execJob)
];

let _getWorkerJobHandles = () => [
  ("send_finish_send_job_data", SendFinishSendJobDataRenderWorkerJob.execJob),
  ("get_init_render_data", GetInitRenderDataRenderWorkerJob.execJob),
  ("get_renderConfig_data", GetRenderConfigDataRenderWorkerJob.execJob),
  ("get_setting_data", GetSettingDataRenderWorkerJob.execJob),
  ("get_workerDetect_data", GetWorkerDetectDataRenderWorkerJob.execJob),
  ("preget_glslData", PregetGLSLDataRenderWorkerJob.execJob),
  ("create_gl", CreateGlRenderWorkerJob.execJob),
  ("preget_glslData", PregetGLSLDataRenderWorkerJob.execJob),
  ("init_state", InitStateRenderWorkerJob.execJob),
  ("init_transform", InitTransformRenderWorkerJob.execJob),
  ("init_basic_material", InitBasicMaterialRenderWorkerJob.execJob),
  ("send_finish_init_render_data", SendFinishInitRenderDataRenderWorkerJob.execJob),
  ("get_render_data", GetRenderDataRenderWorkerJob.execJob),
  ("init_material_for_render", InitMaterialForRenderRenderWorkerJob.execJob),
  ("clear_color", ClearColorRenderWorkerJob.execJob),
  ("clear_buffer", ClearBufferRenderWorkerJob.execJob),
  ("clear_last_send_component", ClearLastSendComponentRenderWorkerJob.execJob),
  (
    "create_basic_render_object_typeArray",
    CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob
  ),
  ("get_camera_data", GetCameraDataRenderWorkerJob.execJob),
  ("send_uniform_shader_data", SendUniformShaderDataRenderWorkerJob.execJob),
  ("render_basic", RenderBasicRenderWorkerJob.execJob),
  ("send_finish_render_data", SendFinishRenderDataRenderWorkerJob.execJob),
  ("get_dispose_data", GetDisposeDataRenderWorkerJob.execJob),
  ("dispose_vbo", DisposeVboRenderWorkerJob.execJob)
];

let createMainInitJobHandleMap = () =>
  HandleJobService.createJobHandleMap(_getMainInitJobHandles());

let createMainLoopJobHandleMap = () =>
  HandleJobService.createJobHandleMap(_getMainLoopJobHandles());

let createWorkerJobHandleMap = () => HandleJobService.createJobHandleMap(_getWorkerJobHandles());

/* TODO duplicate with getMainLoopJobHandle, getWorkerJobHandle */
let getMainInitJobHandle = (name, jobHandleMap) =>
  switch (WonderCommonlib.HashMapService.get(name, jobHandleMap)) {
  | None => JobService.handleGetNoneJob(name, jobHandleMap)
  | Some(handleFunc) => handleFunc
  };

let getMainLoopJobHandle = (name, jobHandleMap) =>
  switch (WonderCommonlib.HashMapService.get(name, jobHandleMap)) {
  | None => JobService.handleGetNoneJob(name, jobHandleMap)
  | Some(handleFunc) => handleFunc
  };

let getWorkerJobHandle = (name, jobHandleMap) =>
  switch (WonderCommonlib.HashMapService.get(name, jobHandleMap)) {
  | None => JobService.handleGetNoneJob(name, jobHandleMap)
  | Some(handleFunc) => handleFunc
  };