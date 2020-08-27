type t = {
  mutable config: option(IConfigDp.config),
  mutable repo: option(IRepoDp.repo),
};

let dpContainer = {config: None, repo: None};

let _unsafeGetConfigDp = () => {
  dpContainer.config->OptionSt.unsafeGet;
};

let unsafeGetPOConfigDp = () => {
  _unsafeGetConfigDp().poConfig;
};

let unsafeGetOtherConfigDp = () => {
  _unsafeGetConfigDp().otherConfig;
};

let setConfigDp = dp => {
  dpContainer.config = dp->Some;

  ();
};

let _unsafeGetRepoDp = () => {
  dpContainer.repo->OptionSt.unsafeGet;
};

let unsafeGetSceneRepoDp = () => {
  _unsafeGetRepoDp().sceneRepo;
};

let unsafeGetGameObjectRepoDp = () => {
  _unsafeGetRepoDp().gameObjectRepo;
};

let unsafeGetTransformRepoDp = () => {
  _unsafeGetRepoDp().transformRepo;
};

let unsafeGetGlobalTempRepoDp = () => {
  _unsafeGetRepoDp().globalTempRepo;
};

let unsafeGetPipelineRepoDp = () => {
  _unsafeGetRepoDp().pipelineRepo;
};

let setRepoDp = dp => {
  dpContainer.repo = dp->Some;

  ();
};
