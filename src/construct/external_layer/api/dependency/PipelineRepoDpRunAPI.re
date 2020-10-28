let unsafeGet = () => {
  DpContainer.unsafeGetPipelineRepoDp();
};

let set = (dp: IPipelineRepoDp.pipelineRepo) => {
  PipelineRepoDpApService.set(dp);
};
