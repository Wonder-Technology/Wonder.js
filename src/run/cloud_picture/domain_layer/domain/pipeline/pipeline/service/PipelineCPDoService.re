open PipelineVOType;

let getInitPipeline = () => {
  PipelineCPRepo.getInitPipeline();
};

let getRunPipeline = () => {
  PipelineCPRepo.getRunPipeline();
};

let getInitPipelineData = () => {
  PipelineCPRepo.getInitPipelineData();
};

let getRunPipelineData = () => {
  PipelineCPRepo.getRunPipelineData();
};

let getPipelineStream = pipeline => {
  PipelineCPRepo.getPipelineStream(pipeline);
};
