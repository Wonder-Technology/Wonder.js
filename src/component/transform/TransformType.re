open ComponentType;

type transform = int;

type position = (float, float, float);

type transformParentMap = array(Js.undefined(transform));

type transformChildMap = array(array(transform));

type transformDirtyMap = array(bool);

/* type originToMoveIndexMap = array int; */
/* type moveToOriginIndexMap = array int; */
type transformDirtyArray = array(int);

type transformData = {
  mutable index: int,
  /* mutable firstDirtyIndex: int, */
  /* mutable oldIndexArrayBeforeAddToDirtyArray: array int, */
  buffer: Js.Typed_array.array_buffer,
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
  localPositions: Js.Typed_array.Float32Array.t,
  parentMap: transformParentMap,
  childMap: transformChildMap,
  gameObjectMap,
  mutable dirtyArray: transformDirtyArray,
  mutable disposedIndexArray: array(transform)
};