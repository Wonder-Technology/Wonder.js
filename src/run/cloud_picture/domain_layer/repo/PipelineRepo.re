let getInitPipeline = () => {
  Repo.getPipeline().initPipeline->PipelineEntity.create;
};

let getRunPipeline = () => {
  Repo.getPipeline().runPipeline->PipelineEntity.create;
};

let getInitPipelineData = () => {
  Repo.getPipeline().initPipelineData;
};

let getRunPipelineData = () => {
  Repo.getPipeline().runPipelineData;
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
