type t = {
  mutable otherConfig: option(IConfigDp.otherConfig),
  mutable poConfig: option(IConfigDp.poConfig),
  mutable repo: option(IRepoDp.repo),
};

let dpContainer = {otherConfig: None, poConfig: None, repo: None};

let unsafeGetOtherConfigDp = () => {
  dpContainer.otherConfig->OptionSt.unsafeGet;
};

let unsafeGetPOConfigDp = () => {
  dpContainer.poConfig->OptionSt.unsafeGet;
};

let setOtherConfigDp = dp => {
  dpContainer.otherConfig = dp->Some;

  ();
};

let setPOConfigDp = dp => {
  dpContainer.poConfig = dp->Some;

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
