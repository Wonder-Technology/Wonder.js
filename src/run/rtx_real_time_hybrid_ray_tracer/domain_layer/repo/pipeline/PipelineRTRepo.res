

let getInitPipeline = () => RTRepo.getPipeline().initPipeline->PipelineEntity.create

let getUpdatePipeline = () => RTRepo.getPipeline().updatePipeline->PipelineEntity.create

let getRenderPipeline = () => RTRepo.getPipeline().renderPipeline->PipelineEntity.create

let getInitPipelineData = () => RTRepo.getPipeline().initPipelineData

let setInitPipelineData = initPipelineData =>
  RTRepo.setPipeline({...RTRepo.getPipeline(), initPipelineData: initPipelineData})

let getUpdatePipelineData = () => RTRepo.getPipeline().updatePipelineData

let setUpdatePipelineData = updatePipelineData =>
  RTRepo.setPipeline({...RTRepo.getPipeline(), updatePipelineData: updatePipelineData})

let getRenderPipelineData = () => RTRepo.getPipeline().renderPipelineData

let setRenderPipelineData = renderPipelineData =>
  RTRepo.setPipeline({...RTRepo.getPipeline(), renderPipelineData: renderPipelineData})

let getPipelineStream = pipeline =>
  pipeline->PipelineEntity.value->PipelineRTRepoDp.getPipelineStream

let setPipelineStream = (pipeline, stream) =>
  PipelineRTRepoDp.setPipelineStream(pipeline->PipelineEntity.value, stream)
