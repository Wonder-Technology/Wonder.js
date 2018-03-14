open MainStateDataType;

let _getMainInitJobHandles = () => [
  ("detect_worker", DetectWorkerMainWorkerJob.execJob),
  ("create_worker_instance", CreateWorkerInstanceMainWorkerJob.execJob),
  ("send_job_data", SendJobDataMainWorkerJob.execJob),
  ("get_finish_send_job_data", GetFinishSendJobDataMainWorkerJob.execJob),
  ("send_init_render_data", SendInitRenderDataMainWorkerJob.execJob),
  ("get_finish_init_render_data", GetFinishInitRenderDataMainWorkerJob.execJob)
];

let _getWorkerJobHandles = () => [
  ("send_finish_send_job_data", SendFinishSendJobDataRenderWorkerJob.execJob),
  ("get_init_render_data", GetInitRenderDataRenderWorkerJob.execJob),
  ("init_gl", InitGlRenderWorkerJob.execJob),
  ("send_finish_init_render_data", SendFinishInitRenderDataRenderWorkerJob.execJob)
];

let createMainInitJobHandleMap = () =>
  JobHandleSystem.createJobHandleMap(_getMainInitJobHandles());

let createWorkerJobHandleMap = () => JobHandleSystem.createJobHandleMap(_getWorkerJobHandles());

let getMainInitJobHandle = (name, jobHandleMap) =>
  switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
  | None => JobSystem.handleGetNoneJob(name, jobHandleMap)
  | Some(handleFunc) => handleFunc
  };

let getWorkerJobHandle = (name, jobHandleMap) =>
  switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
  | None => JobSystem.handleGetNoneJob(name, jobHandleMap)
  | Some(handleFunc) => handleFunc
  };