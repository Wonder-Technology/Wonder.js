let _getInitPipelineJobs = () => list{
  (StartTimeJobEntity.create(), StartTimeJobEntity.exec),
  (InitWebGPURTJobEntity.create(), InitWebGPURTJobEntity.exec),
  (InitCameraRTJobEntity.create(), InitCameraRTJobEntity.exec),
  (InitPassRTJobEntity.create(), InitPassRTJobEntity.exec),
  (InitPathTracingPassRTJobEntity.create(), InitPathTracingPassRTJobEntity.exec),
  (InitBMFRRegressionPassRTJobEntity.create(), InitBMFRRegressionPassRTJobEntity.exec),
  (InitBMFRPostprocessPassRTJobEntity.create(), InitBMFRPostprocessPassRTJobEntity.exec),
  (InitAccumulationPassRTJobEntity.create(), InitAccumulationPassRTJobEntity.exec),
}

let _getUpdatePipelineJobs = () => list{
  (UpdateCameraRTJobEntity.create(), UpdateCameraRTJobEntity.exec),
  (UpdateTextureArrayRTJobEntity.create(), UpdateTextureArrayRTJobEntity.exec),
  (UpdatePathTracingPassRTJobEntity.create(), UpdatePathTracingPassRTJobEntity.exec),
  (UpdatePassRTJobEntity.create(), UpdatePassRTJobEntity.exec),
}

let _getRenderPipelineJobs = () => list{
  (RenderPathTracingPassRTJobEntity.create(), RenderPathTracingPassRTJobEntity.exec),
  (RenderBMFRRegressionPassRTJobEntity.create(), RenderBMFRRegressionPassRTJobEntity.exec),
  (UpdateBMFRRegressionPassRTJobEntity.create(), UpdateBMFRRegressionPassRTJobEntity.exec),
  (RenderBMFRPostprocessPassRTJobEntity.create(), RenderBMFRPostprocessPassRTJobEntity.exec),
  (UpdateAccumulationPassRTJobEntity.create(), UpdateAccumulationPassRTJobEntity.exec),
  (UpdatePassForRenderRTJobEntity.create(), UpdatePassForRenderRTJobEntity.exec),
  (RenderAccumulationPassRTJobEntity.create(), RenderAccumulationPassRTJobEntity.exec),
  (EndRenderRTJobEntity.create(), EndRenderRTJobEntity.exec),
}

let _register = (pipeline, jobs) =>
  jobs->ListSt.forEach(((job, execFunc)) => PipelineRunAPI.registerJob(pipeline, job, execFunc))

let registerAllJobs = () => {
  _register(PipelineRTRepo.getInitPipeline(), _getInitPipelineJobs())
  _register(PipelineRTRepo.getUpdatePipeline(), _getUpdatePipelineJobs())
  _register(PipelineRTRepo.getRenderPipeline(), _getRenderPipelineJobs())
}
