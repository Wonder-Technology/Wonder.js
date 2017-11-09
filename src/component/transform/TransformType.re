open ComponentType;

type transform = int;

type position = (float, float, float);

type transformParentMap = Js.Dict.t(Js.undefined(transform));

type transformChildMap = Js.Dict.t(array(transform));

type transformDirtyMap = Js.Dict.t(bool);

/* type originToMoveIndexMap = Js.Dict.t int; */
/* type moveToOriginIndexMap = Js.Dict.t int; */
type transformDirtyList = array(int);

type transformData = {
  mutable index: int,
  /* mutable firstDirtyIndex: int, */
  /* mutable oldIndexListBeforeAddToDirtyList: array int, */
  mutable buffer: Js.Typed_array.array_buffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable parentMap: transformParentMap,
  mutable childMap: transformChildMap,
  mutable gameObjectMap,
  /* mutable originToMoveIndexMap: originToMoveIndexMap,
     mutable moveToOriginIndexMap: moveToOriginIndexMap */
  mutable dirtyList: transformDirtyList,
  mutable dirtyMap: transformDirtyMap
};
