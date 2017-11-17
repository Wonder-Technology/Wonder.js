open ComponentType;

type transform = int;

type position = (float, float, float);

type transformParentMap = Js.Dict.t(Js.undefined(transform));

type transformChildMap = Js.Dict.t(array(transform));

type transformDirtyMap = Js.Dict.t(bool);

/* type originToMoveIndexMap = Js.Dict.t int; */
/* type moveToOriginIndexMap = Js.Dict.t int; */
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
  disposedIndexArray: array(transform)
};