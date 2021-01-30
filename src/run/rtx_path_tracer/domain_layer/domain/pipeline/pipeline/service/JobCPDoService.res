

let _getInitPipelineJobs = () => list{
  (StartTimeJobEntity.create(), StartTimeJobEntity.exec),
  (InitWebGPUCPJobEntity.create(), InitWebGPUCPJobEntity.exec),
  (InitCameraCPJobEntity.create(), InitCameraCPJobEntity.exec),
  (InitPassCPJobEntity.create(), InitPassCPJobEntity.exec),
  (InitPathTracingPassCPJobEntity.create(), InitPathTracingPassCPJobEntity.exec),
  (InitAccumulationPassCPJobEntity.create(), InitAccumulationPassCPJobEntity.exec),
}

let _getUpdatePipelineJobs = () => list{
  (UpdateCameraCPJobEntity.create(), UpdateCameraCPJobEntity.exec),
  (UpdateTextureArrayCPJobEntity.create(), UpdateTextureArrayCPJobEntity.exec),
  (UpdatePathTracingPassCPJobEntity.create(), UpdatePathTracingPassCPJobEntity.exec),
  (UpdatePassCPJobEntity.create(), UpdatePassCPJobEntity.exec),
}

let _getRenderPipelineJobs = () => list{
  (RenderPathTracingPassCPJobEntity.create(), RenderPathTracingPassCPJobEntity.exec),
  (UpdateAccumulationPassCPJobEntity.create(), UpdateAccumulationPassCPJobEntity.exec),
  (UpdatePassForRenderCPJobEntity.create(), UpdatePassForRenderCPJobEntity.exec),
  (RenderAccumulationPassCPJobEntity.create(), RenderAccumulationPassCPJobEntity.exec),
  (EndRenderCPJobEntity.create(), EndRenderCPJobEntity.exec),
}

let _register = (pipeline, jobs) =>
  jobs->ListSt.forEach(((job, execFunc)) => PipelineRunAPI.registerJob(pipeline, job, execFunc))

let registerAllJobs = () => {
  _register(PipelineCPRepo.getInitPipeline(), _getInitPipelineJobs())
  _register(PipelineCPRepo.getUpdatePipeline(), _getUpdatePipelineJobs())
  _register(PipelineCPRepo.getRenderPipeline(), _getRenderPipelineJobs())
}
