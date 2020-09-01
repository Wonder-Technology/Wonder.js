type t = {
  mutable otherConfig: option(IConfigDp.otherConfig),
  mutable poConfig: option(IConfigDp.poConfig),
  mutable repo: option(IRepoDp.repo),
  mutable time: option(ITimeDp.time),
};

let dpContainer = {otherConfig: None, poConfig: None, repo: None, time: None};

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

let unsafeGetPBRMaterialRepoDp = () => {
  _unsafeGetRepoDp().pbrMaterialRepo;
};

let unsafeGetGeometryRepoDp = () => {
  _unsafeGetRepoDp().geometryRepo;
};

let unsafeGetDirectionLightRepoDp = () => {
  _unsafeGetRepoDp().directionLightRepo;
};

let unsafeGetBasicCameraViewRepoDp = () => {
  _unsafeGetRepoDp().basicCameraViewRepo;
};

let unsafeGetPerspectiveCameraProjectionRepoDp = () => {
  _unsafeGetRepoDp().perspectiveCameraProjectionRepo;
};

let unsafeGetGlobalTempRepoDp = () => {
  _unsafeGetRepoDp().globalTempRepo;
};

let unsafeGetPipelineRepoDp = () => {
  _unsafeGetRepoDp().pipelineRepo;
};

let unsafeGetTimeRepoDp = () => {
  _unsafeGetRepoDp().timeRepo;
};

let setRepoDp = dp => {
  dpContainer.repo = dp->Some;

  ();
};

let unsafeGetTimeDp = () => {
  dpContainer.time->OptionSt.unsafeGet;
};

let setTimeDp = dp => {
  dpContainer.time = dp->Some;

  ();
};
