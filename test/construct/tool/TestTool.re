let init = (~sandbox, ~isDebug=true, ~transformCount=10, ()) => {
  DependencyTool.injectAllDependencies(~isDebug, ~transformCount, ());

  POConfigTool.setAllCount(~transformCount, ());

  CPContainerManager.setPO(CreateCPRepo.create());

  DirectorCPApService._createAndSetAllComponentPOs()
  ->Result.handleFail(err => {err->Exception.throwErr});
};
