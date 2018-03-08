open ComponentType;

type pMatrixMap = array(Js.Typed_array.Float32Array.t);

type dirtyArray = array(int);

type perspectiveCameraProjectionRecord = {
  index: int,
  dirtyArray,
  pMatrixMap,
  nearMap: array(float),
  farMap: array(float),
  fovyMap: array(float),
  aspectMap: array(float),
  gameObjectMap,
  disposedIndexArray: array(component)
};