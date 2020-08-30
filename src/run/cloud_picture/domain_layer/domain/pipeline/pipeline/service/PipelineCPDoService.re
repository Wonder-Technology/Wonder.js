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

let setInitPipelineData = initPipelineData => {
  PipelineCPRepo.setInitPipelineData(initPipelineData);
};

let getRunPipelineData = () => {
  PipelineCPRepo.getRunPipelineData();
};

let setRunPipelineData = runPipelineData => {
  PipelineCPRepo.setRunPipelineData(runPipelineData);
};

let getPipelineStream = pipeline => {
  PipelineCPRepo.getPipelineStream(pipeline);
};
