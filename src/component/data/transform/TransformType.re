open ComponentType;

type transform = int;

type position = (float, float, float);

type transformParentMap = array(Js.undefined(transform));

type transformChildMap = array(array(transform));

type transformDirtyMap = array(bool);

type transformData = {
  mutable index: int,
  /* buffer: Js.Typed_array.array_buffer, */
  /* localToWorldMatrices: Js.Typed_array.Float32Array.t,
     localPositions: Js.Typed_array.Float32Array.t, */
  parentMap: transformParentMap,
  childMap: transformChildMap,
  gameObjectMap,
  /* localToWorldMatrixFloat32ArrayMap: array(Js.Typed_array.Float32Array.t), */
  localToWorldMatrixMap: array(Js.Typed_array.Float32Array.t),
  localPositionMap: array(Js.Typed_array.Float32Array.t),
  localToWorldMatrixTypeArrayPool: array(Js.Typed_array.Float32Array.t),
  localPositionTypeArrayPool: array(Js.Typed_array.Float32Array.t),
  dirtyMap: transformDirtyMap,
  mutable disposedIndexArray: array(transform)
};