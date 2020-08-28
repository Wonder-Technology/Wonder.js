let getInitPipeline = () => {
  CPRepo.getPipeline().initPipeline->PipelineEntity.create;
};

let getRunPipeline = () => {
  CPRepo.getPipeline().runPipeline->PipelineEntity.create;
};

let getInitPipelineData = () => {
  CPRepo.getPipeline().initPipelineData;
};

let getRunPipelineData = () => {
  CPRepo.getPipeline().runPipelineData;
};

let getPipelineStream = pipeline => {
  pipeline
  ->PipelineEntity.value
  ->PipelineCPRepoDp.getPipelineStream
  ->OptionSt.fromNullable;
};

let setPipelineStream = (pipeline, stream) => {
  PipelineCPRepoDp.setPipelineStream(pipeline->PipelineEntity.value, stream);
};
