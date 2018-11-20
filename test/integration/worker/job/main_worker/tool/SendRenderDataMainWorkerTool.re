let prepareForTestSendRenderData = sandbox => {
  let state = TestMainWorkerTool.initWithJobConfig(~sandbox, ());
  let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
  let renderWorker =
    WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
  let postMessageToRenderWorker =
    WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
  MainStateTool.setState(state);

  (state, postMessageToRenderWorker);
};