open StateDataMainType;

let _getMainInitJobHandles = () => [
  ("create_worker_instance", CreateWorkerInstanceMainWorkerJob.execJob),
  ("send_job_data", SendJobDataMainWorkerJob.execJob),
  ("get_finish_send_job_data", GetFinishSendJobDataMainWorkerJob.execJob),
  ("send_init_render_data", SendInitRenderDataMainWorkerJob.execJob),
  ("get_finish_init_render_data", GetFinishInitRenderDataMainWorkerJob.execJob)
];

let _getMainLoopJobHandles = () => [
  ("send_draw_data", SendDrawDataMainWorkerJob.execJob),
  ("get_finish_draw_data", GetFinishDrawDataMainWorkerJob.execJob)
];

let _getWorkerJobHandles = () => [
  ("send_finish_send_job_data", SendFinishSendJobDataRenderWorkerJob.execJob),
  ("get_init_render_data", GetInitRenderDataRenderWorkerJob.execJob),
  ("create_gl", CreateGlRenderWorkerJob.execJob),
  ("init_transform", InitTransformRenderWorkerJob.execJob),
  ("init_basic_material", InitBasicMaterialRenderWorkerJob.execJob),
  ("init_boxGeometry", InitBoxGeometryRenderWorkerJob.execJob),
  ("send_finish_init_render_data", SendFinishInitRenderDataRenderWorkerJob.execJob),
  ("get_draw_data", GetDrawDataRenderWorkerJob.execJob),
  ("send_finish_draw_data", SendFinishDrawDataRenderWorkerJob.execJob)
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