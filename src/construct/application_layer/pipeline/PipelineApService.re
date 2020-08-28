let parsePipelineData = data => {
  ParseDataPipelineDoService.parse(data);
};

let registerJob = (pipeline, job, execFunc) => {
  JobDoService.register(pipeline, job, execFunc);
};

let getPipelineStream = pipeline => {
  PipelineManagerRoot.getPipelineStream(pipeline);
};

let setPipelineStream = (pipeline, stream) => {
  PipelineManagerRoot.setPipelineStream(pipeline, stream);
};

let execPipelineStream = (handleFailFunc, pipelineStream) => {
  ExecStreamPipelineDoService.exec(handleFailFunc, pipelineStream);
};
