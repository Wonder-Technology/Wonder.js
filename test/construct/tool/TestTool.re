let init = (~sandbox, ~isDebug=true, ~transformCount=10, ()) => {
  DependencyTool.injectAllDependencies(~isDebug, ());

  POConfigCPRepo.setTransformCount(transformCount);

  CPContainerManager.setPO(CreateCPRepo.create());

  CreateAllPOECSBuffersCPJobEntity._createAndSetAllECSPOs()
  ->Result.handleFail(err => {err->Exception.throwErr});
};
