let getInitPipeline = () => {
  CPRepo.getPipeline().initPipeline->PipelineEntity.create;
};

let getUpdatePipeline = () => {
  CPRepo.getPipeline().updatePipeline->PipelineEntity.create;
};

let getRenderPipeline = () => {
  CPRepo.getPipeline().renderPipeline->PipelineEntity.create;
};

let getInitPipelineData = () => {
  CPRepo.getPipeline().initPipelineData;
};

let setInitPipelineData = initPipelineData => {
  CPRepo.setPipeline({...CPRepo.getPipeline(), initPipelineData});
};

let getUpdatePipelineData = () => {
  CPRepo.getPipeline().updatePipelineData;
};

let setUpdatePipelineData = updatePipelineData => {
  CPRepo.setPipeline({...CPRepo.getPipeline(), updatePipelineData});
};

let getRenderPipelineData = () => {
  CPRepo.getPipeline().renderPipelineData;
};

let setRenderPipelineData = renderPipelineData => {
  CPRepo.setPipeline({...CPRepo.getPipeline(), renderPipelineData});
};

let getPipelineStream = pipeline => {
  pipeline
  ->PipelineEntity.value
  ->PipelineCPRepoDp.getPipelineStream
  
};

let setPipelineStream = (pipeline, stream) => {
  PipelineCPRepoDp.setPipelineStream(pipeline->PipelineEntity.value, stream);
};
