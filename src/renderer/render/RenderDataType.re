open CacheType;

type renderCameraData = {
  vMatrix: array(float),
  pMatrix: array(float)
};

type renderData = {
  mutable renderList: option(array(string)),
  mutable cameraData: option(renderCameraData)
};