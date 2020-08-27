open PipelineVOType;

let getInitPipeline = () => {
  PipelineRepo.getInitPipeline();
};

let getRunPipeline = () => {
  PipelineRepo.getRunPipeline();
};

let getInitPipelineData = () => {
  PipelineRepo.getInitPipelineData();
};

let getRunPipelineData = () => {
  PipelineRepo.getRunPipelineData();
};

let getPipelineStream = pipeline => {
  PipelineRepo.getPipelineStream(pipeline);
};
