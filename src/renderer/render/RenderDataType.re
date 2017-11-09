open CacheType;

type renderCameraData = {
  vMatrix: cache(array(float)),
  pMatrix: cache(array(float))
};

type renderData = {
  mutable isFirstRender: bool,
  mutable renderList: option(array(string)),
  mutable cameraData: option(renderCameraData)
};