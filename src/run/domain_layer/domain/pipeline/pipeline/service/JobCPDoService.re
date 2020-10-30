let _getInitPipelineJobs = () => [
  (StartTimeJobEntity.create(), StartTimeJobEntity.exec),
  (InitWebGPUCPJobEntity.create(), InitWebGPUCPJobEntity.exec),
  (InitCameraCPJobEntity.create(), InitCameraCPJobEntity.exec),
  (InitPassCPJobEntity.create(), InitPassCPJobEntity.exec),
  (InitPathTracingCPJobEntity.create(), InitPathTracingCPJobEntity.exec),
  (InitAccumulationCPJobEntity.create(), InitAccumulationCPJobEntity.exec),
];

let _getUpdatePipelineJobs = () => [
  (UpdateCameraCPJobEntity.create(), UpdateCameraCPJobEntity.exec),
  // (UpdatePathTracingCPJobEntity.create(), UpdatePathTracingCPJobEntity.exec),
  // (UpdatePassCPJobEntity.create(), UpdatePassCPJobEntity.exec),
  // (
  //   UpdateTextureArrayCPJobEntity.create(),
  //   UpdateTextureArrayCPJobEntity.exec,
  // ),
];

// let _getRenderPipelineJobs = () => [
//   (RenderPathTracingCPJobEntity.create(), RenderPathTracingCPJobEntity.exec),
//   (
//     UpdateAccumulationCPJobEntity.create(),
//     UpdateAccumulationCPJobEntity.exec,
//   ),
//   (
//     UpdatePassForRenderCPJobEntity.create(),
//     UpdatePassForRenderCPJobEntity.exec,
//   ),
//   (
//     RenderAccumulationCPJobEntity.create(),
//     RenderAccumulationCPJobEntity.exec,
//   ),
//   (EndRenderCPJobEntity.create(), EndRenderCPJobEntity.exec),
// ];

let _register = (pipeline, jobs) => {
  jobs->ListSt.forEach(((job, execFunc)) => {
    PipelineRunAPI.registerJob(pipeline, job, execFunc)
  });
};

let registerAllJobs = () => {
  _register(PipelineCPRepo.getInitPipeline(), _getInitPipelineJobs());
  _register(PipelineCPRepo.getUpdatePipeline(), _getUpdatePipelineJobs());
  // _register(PipelineCPRepo.getRenderPipeline(), _getRenderPipelineJobs());
};
